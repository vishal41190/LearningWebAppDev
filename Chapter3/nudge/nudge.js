#!/usr/bin/env node

"use strict";

//Used following websites as reference
    //http://getbootstrap.com/getting-started/
    //http://getbootstrap.com/css/
    //http://getbootstrap.com/components/

var http = require("http"),
    querystring = require("querystring"),
    child_process = require("child_process");

function writeCSS(res) {
    res.writeHead(200, {
        "Content-Type": "text/css"
    });

    res.write("body{padding-top: 40pt;}.form-inline .form-control{width: 200pt;margin-right:20pt;margin-left:5pt;}form button{ width: 100pt;      } ");
    res.end();
}

function beginPage(res, title) {
    res.write("<!DOCTYPE html>\n");
    res.write("<html lang='en'>\n");
    res.write("<head>\n");
    res.write("<meta charset='utf-8'>\n");
    res.write(" <meta name='viewport' content='width=device-width, initial-scale=1'>");
    res.write("<title>"+ title + "</title>\n");
    
    res.write("<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css'> ");
    res.write("<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap-theme.min.css'> ");


    res.write("<link rel='stylesheet' href='style.css' type='text/css'>\n");
    res.write("</head>\n");
    res.write("<body>\n");
}

function endPage(res) {
    res.write("</body>\n");
    res.write("</html>\n");
    res.end();  
}
function writePageHeading(res,tag,title){
    res.write(" <div class='navbar navbar-inverse navbar-fixed-top'>");
    res.write("<div class='container'>");
    res.write("<div class='navbar-header'>");
    res.write("<" + tag + " href='#' class='navbar-brand' >" + title + "</" + tag + ">\n");
    res.write("</div>");
    res.write("</div>");
    res.write("</div>");
}
function writeHeading(res, tag, title) {
    res.write("<div class='container'>");
    res.write("<div class='row'>");
    res.write("<div class='col-lg-12'>");
    res.write("<div class='bs-docs-section clearfix'>");
    res.write("<div class='page-header'>");
    res.write("<" + tag +" id='container'>" + title + "</" + tag + ">\n");
    res.write("</div>");
    
}

function writePre(res, divClass, data) {
    var escaped = data.replace(/</, "&lt;").
                       replace(/>/, "&gt;");

    res.write("<div class='" + divClass + "_div'>\n");
    res.write("<pre><p>");
    res.write(escaped);
    res.write("</p></pre>\n");
    res.write("</div>\n");
    res.write("</div>");
    res.write("</div>");
    res.write("</div>");
    res.write("</div>");  
}

function beginForm(res) {
     res.write("<div class='container'>");
    res.write("<div class='row'>");
    res.write("<div class='col-lg-12'>");
    res.write("<div class='bs-docs-section clearfix'>");
    res.write("<div class='page-header'>");
    res.write("<h3 id='container'>Update!</h3>");
    res.write("</div>");
    res.write("<div class='bs-example' data-example-id='basic-forms'>");
    res.write("<form class='well form-inline' method='POST' action='/push'>");
    
}

function endForm(res) {
     res.write("<div class='form-group'>");
    res.write("<button type='submit' value='Push' class='btn btn-default'><span class='glyphicon glyphiucon-thumbs-up' area-hidden='true'></span>Push</button>");
    res.write("</div>");
    
    res.write("</form>\n");
    res.write("</div>");
    res.write("</div>");
    res.write("</div>");
    res.write("</div>");
    res.write("</div>");
}

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

function beginSelect(res, what) {
    res.write("<div class='form-group " + what + "_div '>");
    res.write("<label for='" + what + "_select'>" + capitalize(what) + " </label>");
    res.write("<select class='form-control' id='" + what +"_select' name='" + what + "'>");
   
}

function writeOption(res, option) {
    res.write("<option value='" + option + "'>" + option + "</option>\n");
}

function endSelect(res) {
    res.write("</select>\n");
    res.write("</div>\n");
}

function gitRemote(res) {
    child_process.exec("git remote", function(err, stdout, stderr) {
        if (err) {
            writeHeading(res, "h2", "Error listing remotes");
            writePre(res, "error", stderr);
            endPage(res);
        } else {
            var output = stdout.toString(),
                remotes = output.split(/\n/);

            beginSelect(res, "remote");

            remotes.forEach(function(remoteName) {
                if (remoteName) {
                    writeOption(res, remoteName);
                }
            });

            endSelect(res);
            endForm(res);
            endPage(res);
        }
    });
}

function gitBranch(res) {
    child_process.exec("git branch", function(err, stdout, stderr) {
        if (err) {
            writeHeading(res, "h2", "Error listing branches");
            writePre(res, "error", stderr);
            endPage(res);
        } else {
            var output = stdout.toString(),
                branches = output.split(/\n/);

            beginForm(res);
            beginSelect(res, "branch");

            branches.forEach(function(branch) {
                var branchName = branch.replace(/^\s*\*?\s*/, "").
                                        replace(/\s*$/, "");

                if (branchName) {
                    writeOption(res, branchName);
                }
            });

            endSelect(res);
            gitRemote(res);
        }
    });
}

function gitStatus(res) {
    child_process.exec("git status", function(err, stdout, stderr) {
        if (err) {
            writeHeading(res, "h2", "Error retrieving status");
            writePre(res, "error", stderr);
            endPage(res);
        } else {
            writeHeading(res, "h2", "Git Status");
            writePre(res, "status", stdout);
            gitBranch(res);
        }
    });
}

function gitPush(req, res) {
    var body = "";

    req.on("data", function(chunk) {
        body += chunk;
    });

    req.on("end", function () {
        var form = querystring.parse(body);

        child_process.exec("git push " + form.remote + " " + form.branch, function(err, stdout, stderr) {
            if (err) {
                writeHeading(res, "h2", "Error pushing repository");
                writePre(res, "error", stderr);
            } else {
                writeHeading(res, "h2", "Git Push");
                writePre(res, "push", stdout);
            }
            gitStatus(res);
        });
    });
}

function frontPage(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/html"
    });

    if (req.url === "/style.css") {
        writeCSS(res);
    } else {
        var title = "Nudge - Web Interface for Git Push";

        beginPage(res, title);
        writePageHeading(res, "a", title);

        if (req.method === "POST" && req.url === "/push") {
            gitPush(req, res);
        } else {
            gitStatus(res);
        }
    }
}

var server = http.createServer(frontPage);
server.listen();
var address = server.address();
console.log("nudge is listening at http://localhost:" + address.port + "/");

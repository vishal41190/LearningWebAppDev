var main = function(){
    "use strict";
    
    var isMultipleOf3 = function(num){
        if(num%3 === 0){
            return true;
        }
        else{
            return false;
        }
    };
    
    var isMultipleOf5 = function (num){
        if(num%5 === 0){
            return true;
        }
        else{
            return false;
        }
    };
    
     var fizzbuzz_1= function(){
    var num;
    for(num = 1; num <=100; num++){
        if(isMultipleOf3(num)){
            if(isMultipleOf5(num)){
                $(".fizzbuzz1").append("FizzBuzz, ");
                
            }
            else{
                $(".fizzbuzz1").append("Fizz, ");
          
            }
        }
        else if(isMultipleOf5(num)){
            $(".fizzbuzz1").append("Buzz, ");
            
        }
        else{
            $(".fizzbuzz1").append(num+", ");
            
        }
       
    }
    };
    
    var fizzbuzz_2 = function(start, end){
        var num;
        for(num=start; num<=end; num++){
           if(isMultipleOf3(num)){
            if(isMultipleOf5(num)){
                $(".fizzbuzz2").append("FizzBuzz, ");
                
            }
            else{
                $(".fizzbuzz2").append("Fizz, ");
           
            }
        }
        else if(isMultipleOf5(num)){
            $(".fizzbuzz2").append("Buzz, ");

        }
        else{
            $(".fizzbuzz2").append(num+", ");
            
        }
        }
    };
    
     var fizzbuzz_3 = function(arr){
        var i;
        var num;
        for(i=0; i<arr.length; i++){
            num=arr[i];
           if(isMultipleOf3(num)){
            if(isMultipleOf5(num)){
                $(".fizzbuzz3").append("FizzBuzz, ");
               
            }
            else{
                $(".fizzbuzz3").append("Fizz, ");
          
            }
        }
        else if(isMultipleOf5(num)){
            $(".fizzbuzz3").append("Buzz, ");
           
        }
        else{
            $(".fizzbuzz3").append(num+", ");
            
        }
        }
    };
     
     
    var fizzbuzz_4= function(obj){
        
    var num;
    for(num = 1; num <=100; num++){
        if(isMultipleOf3(num)){
            if(isMultipleOf5(num)){
                $(".fizzbuzz4").append(obj.divisibleByThree+obj.divisibleByFive+", ");
              
            }
            else{
                $(".fizzbuzz4").append(obj.divisibleByThree+", ");
         
            }
        }
        else if(isMultipleOf5(num)){
            $(".fizzbuzz4").append(obj.divisibleByFive+", ");
           
        }
        else{
            $(".fizzbuzz4").append(num+", ");
           
        }
       
    }   
    };
    
     var fizzbuzz_5= function(arr,obj){
         
        var i;
        var num;
        for(i=0; i<arr.length; i++){
            num=arr[i];
   
        if(isMultipleOf3(num)){
            if(isMultipleOf5(num)){
                $(".fizzbuzz5").append(obj.divisibleByThree+obj.divisibleByFive+", ");
               
            }
            else{
                $(".fizzbuzz5").append(obj.divisibleByThree+", ");
          
            }
        }
        else if(isMultipleOf5(num)){
            $(".fizzbuzz5").append(obj.divisibleByFive+", ");
            
        }
        else{
            $(".fizzbuzz5").append(num+", ");
                
        }
       
    }   
    };
     
    fizzbuzz_1();
    fizzbuzz_2(200,300);
    fizzbuzz_3([101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115]);
    fizzbuzz_4({ divisibleByThree: "foo", divisibleByFive: "bar"});
    fizzbuzz_5([101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115],{ divisibleByThree: "foo", divisibleByFive: "bar"});
    
};



$(document).ready(main);

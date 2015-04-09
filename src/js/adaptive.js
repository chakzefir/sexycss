window.onload = function(){

    var sidebarToggle = document.querySelector( ".sidebar-toggle" ),
        sidebar = document.querySelector( ".sidebar" ),
        blackout = document.querySelector( ".blackout" );


    if(sidebarToggle && sidebar && blackout){

        sidebarToggle.addEventListener( "click", function() {

            sidebarToggle.classList.toggle( "active" );
            sidebar.classList.toggle( "hide" );
            blackout.classList.toggle( "hide" );

        });


        blackout.addEventListener( "click", function(){
            sidebarToggle.classList.remove( "active" );
            sidebar.classList.add( "hide" );
            blackout.classList.add( "hide" );

        });


    }
    else{
        console.warn('Adaptive is not working because of the missing elements. Check for: .sidebar-toggle | .sidebar | .blackout')
    }
};
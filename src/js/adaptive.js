var sidebarToggle = document.querySelector( ".sidebar-toggle" ),
    sidebar = document.querySelector( ".sidebar" ),
    blackout = document.querySelector( ".blackout" );


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
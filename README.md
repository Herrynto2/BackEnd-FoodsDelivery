<h1>Food Delivery</h1>
<h4>App RESTfull API - ExpressJS</h4>
<hr>
<p>Food delivery application is a backend application built with Node JS using the Express JS framework. This application serves to make CRUD items and restaurants where users can make transactions such as order or checkout items in a restaurant.</p>
<h3>Built with</h3>
<hr>
<ul>
    <li><a href="">Node JS</a></li>
    <li><a href="">Express JS</a></li>
</ul>

<h3>Requirements</h3>
<hr>
<ul>
    <li><a href="">Node JS Library</a></li>
    <li><a href="">Postman</a></li>
    <li><a href="">Visual Studio Code Editor</a></li>
    <li><a href="">XAMPP Web Server</a></li>
</ul>

<h3>Using this App</h3>
<hr>
<ul>
    <li>Open the application with a terminal or CMD</li>
    <li>Install npm (install npm)</li>
    <li>Install nodemon (npm install -g nodemon) to run applications </li>
    <li>Open XAMPP-control then start Apache and MySql </li>
    <li>Import the database into phpMyadmin</li>
    <li>Open the installed postman</li>
    <li>Select the postman end point to be run</li>
    <li>Type the HTTP method like (http: // localhost: 3000) then send a request</li>
    <li>You can check the response in the console</li>
</ul>

<h3>End Point</h3>
<hr>
<ul>
    <ul>
        <h4>1. Authentication</h4>
        <li>(POST) /login</li>
        <li>(POST) /register</li>
        <li>(PATCH) /forgot-password</li>
    </ul>
    <p></p>
    <ul>
        <h4>2. Super admin</h4>
        <li>(DELETE) /profile</li>
        <li>(DELETE) /restaurant</li>
    </ul>
    <p></p>
    <ul>
        <h4>3. Admin</h4>
        <li>(CRUD) /items</li>
        <li>(CRUD) /restaurant</li>
        <li>(CRUD) /category</li>
    </ul>
    <p></p>
    <ul>
        <h4>4. General User</h4>
        <li>(CRUD) /profile</li>
        <li>(CRUD) /carts</li>
        <li>(CRUD) /reviews</li>
    </ul>
    <p></p>
    <ul>
        <h4>5. Guest</h4>
        <li>(GET) /Browse-items</li>
        <li>(GET) /Browse-restaurants</li>
        <li>(GET) /Browse-category</li>
    </ul>
</ul>

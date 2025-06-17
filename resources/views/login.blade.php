<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <title>Login</title>
    <link rel="stylesheet" href="/css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
</head>
<body>
    <div class="wrapper">
        <form action="login" method="POST">
            @csrf
            <h1>Login</h1>
            <div class="input-box">
                <input type="text" placeholder="Username" name="username" required>
                <i class="fa-solid fa-user"></i>
            </div>
            <div class="input-box">
                <input type="password" placeholder="Password" name="password" required>
                <i class="fa-solid fa-lock"></i>
            </div>

            <div class="remember-forgot">
                <label><input type="checkbox">Remember me</label>
                <a href="#">Forgot password</a>
            </div>

            <button type="submit" class="btn">Login</button>
 
            <div class="register-link">
                <p>Don't have an account? <a href="/register">Register</a></p>
            </div>
        </form>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/js/bootstrap.bundle.min.js" integrity="sha384-j1CDi7MgGQ12Z7Qab0qlWQ/Qqz24Gc6BM0thvEMVjHnfYGF0rmFCozFSxQBxwHKO" crossorigin="anonymous"></script>
</body>
</html>
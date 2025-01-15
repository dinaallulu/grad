<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/svg+xml" href="../public/vite.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Vite + React</title>
        @viteReactRefresh
        @vite('resources/js/main.jsx')
    </head>
    <body>
        <div id="root"></div>
        {{-- <script type="module" src="../../resources/js/main.jsx"></script> --}}
    </body>
</html>
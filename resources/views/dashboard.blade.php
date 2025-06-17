<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TemanLomba - Dashboard (Statik)</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body class="antialiased">
    <section class="main flex flex-col mx-52" style="align-self: baseline">
        <header class="sticky top-0 bg-white/80 backdrop-blur-lg shadow-sm z-30">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between h-16">
                    <div class="flex-shrink-0">
                        <h1 class="text-2xl font-bold text-primary">TemanLomba</h1>
                    </div>
                    <div class="flex-1 flex justify-center px-2 lg:ml-6 lg:justify-end">
                        <div class="max-w-lg w-full lg:max-w-xs">
                            <label for="search" class="sr-only">Cari Lomba</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span class="text-gray-500 sm:text-sm">🔍</span>
                                </div>
                                <input id="search-input-static" name="search" class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-secondary focus:border-secondary sm:text-sm" placeholder="Cari lomba..." type="search">
                            </div>
                        </div>
                    </div>
                    <div class="ml-4 flex items-center">
                        <div id="user-info-static" class="text-right mr-4">
                            <div class="font-semibold">Mahasiswa Contoh</div>
                            <div class="text-xs text-gray-500">Mahasiswa</div>
                        </div>
                        <button class="btn p-2 rounded-full text-gray-500 mr-2">
                            <span class="text-xl">👤</span> </button>
                        <button class="btn p-2 rounded-full text-gray-500">
                            <span class="text-xl">➔</span> </button>
                    </div>
                </div>
            </div>
        </header>
    
        <main class="container mx-auto p-4 sm:p-6 lg:p-8">
            <h2 class="text-2xl font-bold text-primary mb-4">Daftar Lomba Tersedia</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="card bg-white rounded-xl shadow-md overflow-hidden">
                    <div class="p-6">
                        <div class="uppercase tracking-wide text-sm text-secondary font-semibold">Desain</div>
                        <h3 class="block mt-1 text-lg leading-tight font-medium text-primary">Lomba Desain UI/UX FindIT UGM</h3>
                        <p class="mt-2 text-gray-500 text-sm">Mencari 1 orang desainer UI/UX untuk tim kami. Diutamakan yang menguasai Figma...</p>
                        <div class="mt-4 text-xs text-gray-400">Diposting oleh: anisa</div>
                        <div class="mt-4">
                            <a href="#" class="text-blue-500 hover:underline text-sm">Lihat Detail (Tidak Berfungsi)</a>
                        </div>
                    </div>
                </div>
    
                <div class="card bg-white rounded-xl shadow-md overflow-hidden">
                    <div class="p-6">
                        <div class="uppercase tracking-wide text-sm text-secondary font-semibold">Programming</div>
                        <h3 class="block mt-1 text-lg leading-tight font-medium text-primary">GEMASTIK XV - Divisi Pemrograman</h3>
                        <p class="mt-2 text-gray-500 text-sm">Butuh 2 programmer kompetitif untuk divisi pemrograman. Wajib menguasai C++...</p>
                        <div class="mt-4 text-xs text-gray-400">Diposting oleh: budi</div>
                        <div class="mt-4">
                            <a href="#" class="text-blue-500 hover:underline text-sm">Lihat Detail (Tidak Berfungsi)</a>
                        </div>
                    </div>
                </div>
    
                </div>
        </main>
    </section>

    <button class="btn fixed bottom-8 right-8 bg-secondary text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center text-3xl">
        +
    </button>

    </body>
</html>

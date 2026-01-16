<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel Administratora - Bieg 2026</title>
    <link rel="stylesheet" href="style.css">
    <style>
        /* Proste style tylko dla panelu admina */
        .admin-layout { display: flex; min-height: 80vh; margin-top: 20px; }
        .sidebar { width: 250px; background: #003366; color: white; padding: 20px; border-radius: 0 10px 10px 0; }
        .sidebar ul { list-style: none; padding: 0; }
        .sidebar li { padding: 15px; cursor: pointer; border-bottom: 1px solid rgba(255,255,255,0.1); }
        .sidebar li:hover, .sidebar li.active { background: #004080; font-weight: bold; color: #ffcc00; }
        .content-area { flex: 1; padding: 30px; background: white; margin-left: 20px; border-radius: 10px; box-shadow: 0 0 15px rgba(0,0,0,0.1); }
        .tab-content { display: none; }
        .tab-content.active { display: block; }
        .form-group { margin-bottom: 15px; }
        .form-group label { display: block; margin-bottom: 5px; font-weight: bold; }
        .form-group input, .form-group textarea { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
        .btn-save { background: #28a745; color: white; padding: 10px 20px; border: none; cursor: pointer; margin-top: 10px; }
        .btn-reset { background: #dc3545; color: white; padding: 10px 20px; border: none; cursor: pointer; margin-top: 10px; margin-left: 10px; }
    </style>
</head>
<body>

    <header>
        <div class="container">
            <div class="logo">Panel Admina</div>
            <nav>
                <ul>
                    <li><a href="index.html">Start</a></li>
                    <li><a href="trasa.html">Trasa</a></li>
                    <li><a href="cennik.html">Cennik</a></li>
                    <li><a href="nagrody.html">Nagrody</a></li>
                    <li><a href="regulamin.html">Regulamin</a></li>
                    <li><a href="dashboard.html" class="active" style="color: #ffcc00; font-weight: bold;">Admin</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <div class="container admin-layout">
        <aside class="sidebar">
            <ul>
                <li onclick="switchTab('tab-cennik')" class="active">💰 Edytuj Cennik</li>
                <li onclick="switchTab('tab-trasa')">🗺️ Edytuj Trasę</li>
                <li onclick="switchTab('tab-nagrody')">🏆 Edytuj Nagrody</li>
                <li onclick="switchTab('tab-regulamin')">📜 Edytuj Regulamin</li>
            </ul>
        </aside>

        <main class="content-area">
            <h2 style="border-bottom: 2px solid #eee; padding-bottom: 10px; margin-bottom: 20px;">Zarządzanie treścią</h2>

            <div id="tab-cennik" class="tab-content active">
                <h3>Edycja Cennika</h3>
                <form id="cennik-form">
                    </form>
                <button class="btn-save" onclick="saveCennik()">Zapisz Cennik</button>
            </div>

            <div id="tab-trasa" class="tab-content">
                <h3>Edycja Trasy</h3>
                <form id="trasa-form">
                    </form>
                <button class="btn-save" onclick="saveTrasa()">Zapisz Trasę</button>
            </div>

            <div id="tab-nagrody" class="tab-content">
                <h3>Edycja Nagród</h3>
                <form id="nagrody-form">
                     </form>
                <button class="btn-save" onclick="saveNagrody()">Zapisz Nagrody</button>
            </div>

            <div id="tab-regulamin" class="tab-content">
                <h3>Edycja Regulaminu</h3>
                <form id="regulamin-form">
                     </form>
                <button class="btn-save" onclick="saveRegulamin()">Zapisz Regulamin</button>
            </div>

            <div style="margin-top: 30px; border-top: 1px solid #ccc; padding-top: 20px;">
                <button class="btn-reset" onclick="resetToDefaults()">⚠ Przywróć domyślne</button>
                <p style="font-size: 0.8rem; color: #666; margin-top: 5px;">Usuwa wszystkie zmiany i przywraca stan początkowy.</p>
            </div>
        </main>
    </div>

    <script src="dashboard.js"></script>
</body>
</html>

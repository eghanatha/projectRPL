document.addEventListener('DOMContentLoaded', () => {
    const appState = {
        currentUser: null,
        competitions: JSON.parse(localStorage.getItem('competitions')) || [
            { id: 1, title: 'Lomba Desain UI/UX FindIT UGM', category: 'Desain', description: 'Mencari 1 orang desainer UI/UX untuk tim kami. Diutamakan yang menguasai Figma dan memiliki portofolio. Mari berjuang bersama!', contactPersonName: 'Anisa Rahmawati', contactPersonPhone: '081234567890', postedBy: { username: 'anisa' } },
            { id: 2, title: 'GEMASTIK XV - Divisi Pemrograman', category: 'Programming', description: 'Butuh 2 programmer kompetitif untuk divisi pemrograman. Wajib menguasai C++ atau Java dan algoritma dasar. Yuk join!', contactPersonName: 'Budi Santoso', contactPersonPhone: '081298765432', postedBy: { username: 'budi' } },
            { id: 3, title: 'Mobile Legends Campus Championship', category: 'E-Sports', description: 'Tim kami kurang 1 orang role Tank/Roamer. Tier minimal Mythic. Harus bisa komunikasi dan tidak toxic. Gas push rank bareng!', contactPersonName: 'Cindy Aulia', contactPersonPhone: '085611223344', postedBy: { username: 'cindy' } },
            { id: 4, title: 'Kompetisi Rencana Bisnis Nasional', category: 'Bisnis', description: 'Mencari anggota tim dengan latar belakang manajemen atau keuangan untuk menyusun proposal bisnis. Punya ide inovatif? Gabung sini!', contactPersonName: 'Doni Firmansyah', contactPersonPhone: '087755667788', postedBy: { username: 'doni' } },
            { id: 5, title: 'Lomba Karya Tulis Ilmiah (LKTI)', category: 'Sains', description: 'Dibutuhkan 1 orang yang teliti dan jago dalam riset literatur untuk LKTI tingkat nasional. Tema: Energi Terbarukan.', contactPersonName: 'Eka Putri', contactPersonPhone: '089912341234', postedBy: { username: 'eka' } },
            { id: 6, title: 'Hackathon Merdeka 3.0', category: 'Programming', description: 'Tim developer butuh 1 orang Frontend Developer (React/Vue) dan 1 orang Backend (Node.js/Express). Ayo kita bangun solusi inovatif dalam 24 jam!', contactPersonName: 'Fajar Nugroho', contactPersonPhone: '082187654321', postedBy: { username: 'fajar' } },
        ],
        nextId: (JSON.parse(localStorage.getItem('competitions'))?.length || 0) + 1,
        filter: '',
        modalMode: 'add', // 'add' or 'edit'
        editingCompetitionId: null,
    };

    // Ambil informasi user dari localStorage saat halaman dimuat
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
        appState.currentUser = JSON.parse(storedUser);
    } else {
        // Jika tidak ada user di localStorage, redirect kembali ke login
        window.location.href = 'index.html';
        return; // Hentikan eksekusi script lebih lanjut
    }

    const mainDashboardView = document.getElementById('main-dashboard-view');
    const detailView = document.getElementById('detail-view');
    const profileView = document.getElementById('profile-view');
    const competitionListEl = document.getElementById('competition-list');
    const competitionDetailContentEl = document.getElementById('competition-detail-content');
    const searchInput = document.getElementById('search-input');
    const noResultsEl = document.getElementById('no-results');
    const userInfoEl = document.getElementById('user-info');
    const adminDashboardSummary = document.getElementById('admin-dashboard-summary');
    const totalCompetitionsEl = document.getElementById('total-competitions');
    const competitionModal = document.getElementById('competition-modal');
    const modalTitle = document.getElementById('modal-title');
    const competitionForm = document.getElementById('competition-form');
    const addCompetitionButton = document.getElementById('add-competition-button');

    const profileUsernameEl = document.getElementById('profile-username');
    const profileRoleEl = document.getElementById('profile-role');


    function saveCompetitionsToLocalStorage() {
        localStorage.setItem('competitions', JSON.stringify(appState.competitions));
    }

    function showPage(pageId) {
        mainDashboardView.classList.add('hidden');
        detailView.classList.add('hidden');
        profileView.classList.add('hidden');

        if (pageId === 'main') {
            mainDashboardView.classList.remove('hidden');
        } else if (pageId === 'detail') {
            detailView.classList.remove('hidden');
        } else if (pageId === 'profile') {
            profileView.classList.remove('hidden');
        }
    }

    function renderUserInfo() {
        if (appState.currentUser) {
            userInfoEl.innerHTML = `
                <div class="font-semibold">${appState.currentUser.username}</div>
                <div class="text-xs text-gray-500">${appState.currentUser.role === 'admin' ? 'Admin' : 'Mahasiswa'}</div>
            `;
        }
    }

    function renderAdminDashboardSummary() {
        if (appState.currentUser && appState.currentUser.role === 'admin') {
            adminDashboardSummary.classList.remove('hidden');
            totalCompetitionsEl.textContent = appState.competitions.length;
        } else {
            adminDashboardSummary.classList.add('hidden');
        }
    }

    function renderCompetitions() {
        const filteredCompetitions = appState.competitions.filter(c =>
            c.title.toLowerCase().includes(appState.filter.toLowerCase()) ||
            c.category.toLowerCase().includes(appState.filter.toLowerCase()) ||
            c.description.toLowerCase().includes(appState.filter.toLowerCase())
        );

        competitionListEl.innerHTML = '';
        if(filteredCompetitions.length === 0) {
            noResultsEl.style.display = 'block';
        } else {
            noResultsEl.style.display = 'none';
        }

        filteredCompetitions.forEach(comp => {
            const card = document.createElement('div');
            card.className = 'card bg-white rounded-xl shadow-md overflow-hidden cursor-pointer';
            card.dataset.id = comp.id;

            let actionButtons = '';
            // Only Admin can see edit and delete buttons
            if (appState.currentUser.role === 'admin') {
                 actionButtons += `
                    <button data-delete-id="${comp.id}" class="delete-btn btn text-sm bg-red-100 text-red-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-200">❌</button>
                    <button data-edit-id="${comp.id}" class="edit-btn btn text-sm bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-200">✏️</button>
                `;
            }

            const buttonsContainer = actionButtons ? `<div class="absolute top-3 right-3 flex space-x-2">${actionButtons}</div>` : '';

            card.innerHTML = `
                <div class="p-6 relative">
                    ${buttonsContainer}
                    <div class="uppercase tracking-wide text-sm text-secondary font-semibold">${comp.category}</div>
                    <h3 class="block mt-1 text-lg leading-tight font-medium text-primary">${comp.title}</h3>
                    <p class="mt-2 text-gray-500 text-sm">${comp.description.substring(0, 100)}...</p>
                    <div class="mt-4 text-xs text-gray-400">Diposting oleh: ${comp.postedBy.username}</div>
                </div>
            `;
            card.addEventListener('click', (e) => {
                // Prevent detail view if delete or edit button is clicked
                if (!e.target.closest('.delete-btn') && !e.target.closest('.edit-btn')) {
                    renderCompetitionDetail(comp.id);
                    showPage('detail');
                }
            });
            competitionListEl.appendChild(card);
        });

        // Attach event listeners for delete/edit buttons only if admin
        if (appState.currentUser.role === 'admin') {
            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', handleDelete);
            });
            document.querySelectorAll('.edit-btn').forEach(button => {
                button.addEventListener('click', handleEdit);
            });
        }
    }

    function handleDelete(e) {
        e.stopPropagation();
        const id = parseInt(e.target.closest('[data-delete-id]').dataset.deleteId);
        const isConfirmed = confirm('Anda yakin ingin menghapus lomba ini?'); // Using confirm for simplicity, should be custom modal
        if (isConfirmed) {
            appState.competitions = appState.competitions.filter(c => c.id !== id);
            saveCompetitionsToLocalStorage();
            renderCompetitions();
            renderAdminDashboardSummary(); // Update total competitions
        }
    }

    function handleEdit(e) {
        e.stopPropagation();
        const id = parseInt(e.target.closest('[data-edit-id]').dataset.editId);
        const competitionToEdit = appState.competitions.find(c => c.id === id);

        if (competitionToEdit) {
            appState.modalMode = 'edit';
            appState.editingCompetitionId = id;
            modalTitle.textContent = 'Edit Lomba';

            document.getElementById('competition-id').value = competitionToEdit.id;
            document.getElementById('title').value = competitionToEdit.title;
            document.getElementById('category').value = competitionToEdit.category;
            document.getElementById('description').value = competitionToEdit.description;
            document.getElementById('contactPersonName').value = competitionToEdit.contactPersonName;
            document.getElementById('contactPersonPhone').value = competitionToEdit.contactPersonPhone;

            showModal();
        }
    }

    function renderCompetitionDetail(id) {
        const comp = appState.competitions.find(c => c.id === id);
        if (!comp) return;

        competitionDetailContentEl.innerHTML = `
            <div class="bg-white p-8 rounded-2xl shadow-lg">
                <span class="inline-block bg-accent/20 text-accent-800 text-sm font-medium mb-4 px-3 py-1 rounded-full">${comp.category}</span>
                <h1 class="text-4xl font-bold text-primary mb-4">${comp.title}</h1>
                <p class="text-lg text-gray-600 mb-6">${comp.description}</p>

                <div class="mt-8 border-t border-gray-200 pt-6">
                    <h3 class="text-xl font-semibold text-primary mb-4">Informasi Kontak</h3>
                    <div class="bg-green-50 p-6 rounded-lg border border-green-200">
                        <p class="font-medium text-gray-800">Nama: ${comp.contactPersonName}</p>
                        <p class="font-medium text-gray-800 mt-2">WhatsApp: <a href="https://wa.me/${comp.contactPersonPhone}" target="_blank" class="text-green-600 hover:underline">${comp.contactPersonPhone}</a></p>
                        <p class="text-xs text-gray-500 mt-4">Klik nomor untuk langsung menghubungi via WhatsApp.</p>
                    </div>
                </div>
                 <div class="mt-6 text-sm text-gray-400">Diposting oleh: ${comp.postedBy.username}</div>
            </div>
        `;
    }

    function renderProfileView() {
        if (appState.currentUser) {
            profileUsernameEl.textContent = appState.currentUser.username;
            profileRoleEl.textContent = appState.currentUser.role === 'admin' ? 'Admin' : 'Mahasiswa';
        }
    }


    function showModal() {
        competitionModal.classList.remove('opacity-0', 'pointer-events-none');
        competitionModal.querySelector('.modal-content').classList.remove('scale-95');
    }

    function hideModal() {
        competitionModal.classList.add('opacity-0', 'pointer-events-none');
        competitionModal.querySelector('.modal-content').classList.add('scale-95');
    }

    // Event Listeners
    document.getElementById('logout-button').addEventListener('click', () => {
        localStorage.removeItem('currentUser'); // Hapus info user dari localStorage
        window.location.href = 'index.html'; // Redirect ke halaman login
    });

    document.getElementById('back-to-main-from-detail-button').addEventListener('click', () => {
        showPage('main');
    });

    document.getElementById('view-profile-button').addEventListener('click', () => {
        renderProfileView(); // Populate profile data
        showPage('profile'); // Show profile view
    });

    document.getElementById('back-to-main-from-profile-button').addEventListener('click', () => {
        showPage('main');
    });

    let debounceTimer;
    searchInput.addEventListener('keyup', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            appState.filter = searchInput.value;
            renderCompetitions();
        }, 300);
    });

    // Hide add competition button for 'user' (Mahasiswa)
    if (appState.currentUser && appState.currentUser.role === 'user') {
        addCompetitionButton.classList.add('hidden');
    } else {
        // Only Admin can add competitions, so ensure button is visible for admin
        addCompetitionButton.classList.remove('hidden');
        document.getElementById('add-competition-button').addEventListener('click', () => {
            appState.modalMode = 'add';
            appState.editingCompetitionId = null;
            modalTitle.textContent = 'Tambah Lomba Baru';
            competitionForm.reset();
            showModal();
        });
    }

    document.getElementById('cancel-modal-button').addEventListener('click', () => hideModal());

    competitionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = {
            title: document.getElementById('title').value,
            category: document.getElementById('category').value,
            description: document.getElementById('description').value,
            contactPersonName: document.getElementById('contactPersonName').value,
            contactPersonPhone: document.getElementById('contactPersonPhone').value,
        };

        if (appState.modalMode === 'add') {
            const newCompetition = {
                id: appState.nextId++,
                ...formData,
                postedBy: { username: appState.currentUser.username },
            };
            appState.competitions.unshift(newCompetition); // Tambahkan ke awal array
        } else if (appState.modalMode === 'edit') {
            const index = appState.competitions.findIndex(c => c.id === appState.editingCompetitionId);
            if (index !== -1) {
                appState.competitions[index] = {
                    ...appState.competitions[index], // Keep original postedBy
                    ...formData
                };
            }
        }
        saveCompetitionsToLocalStorage();
        renderCompetitions();
        hideModal();
        renderAdminDashboardSummary(); // Update total competitions
    });

    // Initial render saat halaman dashboard dimuat
    renderUserInfo();
    renderAdminDashboardSummary();
    renderCompetitions();
    showPage('main'); // Pastikan tampilan utama dashboard yang aktif saat pertama kali dimuat
});

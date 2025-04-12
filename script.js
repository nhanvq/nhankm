let entries = JSON.parse(localStorage.getItem('loveDiary')) || [];
const formPopup = document.getElementById('entryForm');
const entriesGrid = document.getElementById('entriesGrid');
let selectedImage = null;

// Mở form
document.getElementById('addBtn').addEventListener('click', () => {
    formPopup.style.display = 'block';
});

// Đóng form
document.getElementById('cancelBtn').addEventListener('click', () => {
    formPopup.style.display = 'none';
    resetForm();
});

// Xử lý upload ảnh
document.getElementById('imageInput').addEventListener('change', function(e) {
    const reader = new FileReader();
    reader.onload = () => {
        selectedImage = reader.result;
        document.getElementById('previewImage').src = selectedImage;
        document.getElementById('previewImage').style.display = 'block';
    }
    reader.readAsDataURL(e.target.files[0]);
});

// Lưu entry
document.querySelector('.form-container').addEventListener('submit', (e) => {
    e.preventDefault();
    const message = document.getElementById('message').value;
    
    const newEntry = {
        id: Date.now(),
        image: selectedImage,
        message: message,
        date: new Date().toLocaleDateString()
    };
    
    entries.push(newEntry);
    saveToStorage();
    renderEntries();
    resetForm();
    formPopup.style.display = 'none';
});

// Render entries
function renderEntries() {
    entriesGrid.innerHTML = entries.map(entry => `
        <div class="entry-card" data-id="${entry.id}">
            <img src="${entry.image}" class="entry-img" alt="Kỷ niệm">
            <div class="entry-content">
                <p>${entry.message}</p>
                <small>${entry.date}</small>
            </div>
            <button class="edit-btn" onclick="editEntry(${entry.id})">
                <i class="fas fa-edit"></i>
            </button>
            <button class="delete-btn" onclick="deleteEntry(${entry.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

// Chỉnh sửa entry
function editEntry(id) {
    const entry = entries.find(item => item.id === id);
    formPopup.style.display = 'block';
    document.getElementById('message').value = entry.message;
    document.getElementById('previewImage').src = entry.image;
    document.getElementById('previewImage').style.display = 'block';
    selectedImage = entry.image;
    
    // Xóa entry cũ
    entries = entries.filter(item => item.id !== id);
    saveToStorage();
}

// Xóa entry
function deleteEntry(id) {
    entries = entries.filter(item => item.id !== id);
    saveToStorage();
    renderEntries();
}

// Tiện ích
function resetForm() {
    document.getElementById('message').value = '';
    document.getElementById('previewImage').style.display = 'none';
    selectedImage = null;
}

function saveToStorage() {
    localStorage.setItem('loveDiary', JSON.stringify(entries));
}

// Khởi động
renderEntries();

document.addEventListener('DOMContentLoaded', function() {

    // ==================== MOBILE MENU ====================
    // Tạo nút toggle menu cho mobile
    const createMobileMenu = () => {
        const mobileMenuToggle = document.createElement('button');
        mobileMenuToggle.className = 'mobile-menu-toggle';
        mobileMenuToggle.innerHTML = '<span></span><span></span><span></span>';
        
        const headerBody = document.querySelector('.header .body');
        if (headerBody) {
            headerBody.prepend(mobileMenuToggle);

            // Xử lý click toggle menu
            mobileMenuToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                document.querySelector('.nav').classList.toggle('active');
                document.body.classList.toggle('no-scroll');
            });

            // Đóng menu khi click vào item
            document.querySelectorAll('.nav a').forEach(link => {
                link.addEventListener('click', function() {
                    if (window.innerWidth <= 767) {
                        mobileMenuToggle.classList.remove('active');
                        document.querySelector('.nav').classList.remove('active');
                        document.body.classList.remove('no-scroll');
                    }
                });
            });
        }
    };

    // ==================== CUỘN MƯỢT ====================
    const setupSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#!') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    };

    // ==================== HIỆU ỨNG KHÓA HỌC ====================
    const setupCourseInteractions = () => {
        document.querySelectorAll('.course-item').forEach(item => {
            // Hiệu ứng hover
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '';
            });

            // Click vào thẻ khóa học
            item.addEventListener('click', function(e) {
                if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
                
                const courseTitle = this.querySelector('.title a').textContent;
                const coursePrice = this.querySelector('.price').textContent;
                
                showCourseModal(courseTitle, coursePrice);
            });
        });
    };

    // ==================== HỆ THỐNG ĐĂNG KÝ ====================
    // Hiển thị modal khóa học
    const showCourseModal = (title, price) => {
        const modal = document.createElement('div');
        modal.className = 'course-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h3>${title}</h3>
                <p class="modal-price">Giá: ${price}</p>
                <p>Bạn muốn đăng ký khóa học này?</p>
                <div class="modal-actions">
                    <button class="btn modal-close">Để sau</button>
                    <button class="btn modal-confirm">Đăng ký ngay</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        document.body.classList.add('no-scroll');

        // Xử lý đóng modal
        modal.querySelector('.close-modal').addEventListener('click', closeModal);
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        
        // Xử lý đăng ký
        modal.querySelector('.modal-confirm').addEventListener('click', function() {
            closeModal();
            handleRegistration(`khóa học ${title}`);
        });

        function closeModal() {
            modal.remove();
            document.body.classList.remove('no-scroll');
        }
    };

    // Xử lý đăng ký chung
    const handleRegistration = (context = "tham gia hệ thống") => {
        const form = document.createElement('div');
        form.className = 'registration-form';
        form.innerHTML = `
            <div class="form-content">
                <span class="close-form">&times;</span>
                <h3>Đăng ký ${context}</h3>
                <form id="course-registration">
                    <div class="form-group">
                        <label for="reg-name">Họ và tên <span>*</span></label>
                        <input type="text" id="reg-name" required>
                    </div>
                    <div class="form-group">
                        <label for="reg-email">Email <span>*</span></label>
                        <input type="email" id="reg-email" required>
                    </div>
                    <div class="form-group">
                        <label for="reg-phone">Số điện thoại <span>*</span></label>
                        <input type="tel" id="reg-phone" required>
                    </div>
                    <button type="submit" class="btn">Gửi đăng ký</button>
                </form>
            </div>
        `;
        
        document.body.appendChild(form);
        document.body.classList.add('no-scroll');

        // Đóng form
        form.querySelector('.close-form').addEventListener('click', function() {
            form.remove();
            document.body.classList.remove('no-scroll');
        });

        // Gửi form
        form.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Kiểm tra validation
            if (!validateForm()) return;
            
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            
            form.remove();
            showThankYouMessage(name, email, context);
        });

        // Kiểm tra form hợp lệ
        const validateForm = () => {
            let isValid = true;
            const inputs = form.querySelectorAll('input[required]');
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    input.style.borderColor = 'red';
                    isValid = false;
                } else {
                    input.style.borderColor = '';
                }
            });
            
            return isValid;
        };
    };

    // Hiển thị thông báo sau đăng ký
    const showThankYouMessage = (name, email, context) => {
        const thankYou = document.createElement('div');
        thankYou.className = 'thank-you-message';
        thankYou.innerHTML = `
            <div class="message-content">
                <h3>Cảm ơn bạn, ${name}!</h3>
                <p>Chúng tôi đã nhận đăng ký ${context}.</p>
                <p>Thông tin xác nhận sẽ được gửi đến email: <strong>${email}</strong></p>
                <button class="btn close-message">Đóng</button>
            </div>
        `;
        
        document.body.appendChild(thankYou);
        document.body.classList.add('no-scroll');
        
        thankYou.querySelector('.close-message').addEventListener('click', function() {
            thankYou.remove();
            document.body.classList.remove('no-scroll');
        });
    };

    // ==================== XỬ LÝ TẤT CẢ NÚT ĐĂNG KÝ ====================
    const setupAllRegisterButtons = () => {
        // 1. Nút Đăng Ký trong menu
        document.querySelectorAll('.sign-up-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                handleRegistration("tham gia hệ thống");
            });
        });

        // 2. Các nút Đăng Ký khóa học
        document.querySelectorAll('.book-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const courseTitle = this.closest('.course-item').querySelector('.title a').textContent;
                handleRegistration(`khóa học ${courseTitle}`);
            });
        });
    };

    // ==================== KHỞI TẠO TẤT CẢ TÍNH NĂNG ====================
    const initAllFeatures = () => {
        createMobileMenu();
        setupSmoothScroll();
        setupCourseInteractions();
        setupAllRegisterButtons();
        
        // Hiển thị log khi load thành công
        console.log('Đã tải xong tất cả tính năng!');
    };

    // Bắt đầu khởi tạo
    initAllFeatures();
});
// ==================== XỬ LÝ NÚT ĐĂNG KÝ MÀU VÀNG ====================
const setupPrimaryRegisterButtons = () => {
    // Xử lý tất cả nút có class .btn-primary (nút màu vàng)
    document.querySelectorAll('.btn.hero-cta, .btn.primary, .btn[style*="background: var(--primary-color)"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Lấy ngữ cảnh đăng ký từ data attribute hoặc text nút
            const context = this.dataset.context || 
                          this.textContent.trim() || 
                          "khóa học";
            
            // Thêm hiệu ứng nhấn
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            handleRegistration(context);
        });
    });

    // Xử lý nút trong modal xác nhận
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-confirm')) {
            const modal = e.target.closest('.modal-content');
            const title = modal.querySelector('h3').textContent;
            handleRegistration(`khóa học ${title}`);
        }
    });
};

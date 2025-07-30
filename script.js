// Central European Travel Guide JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });

        // Close mobile menu when pressing Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Hero Slideshow
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Show current slide
        if (slides[index]) {
            slides[index].classList.add('active');
            dots[index].classList.add('active');
        }
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Auto-advance slideshow every 5 seconds
    if (slides.length > 0) {
        setInterval(nextSlide, 5000);
        
        // Add click handlers to dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });
    }

    // Active navigation highlighting
    const sections = document.querySelectorAll('section[id]');
    const navbarLinks = document.querySelectorAll('.nav-link');

    function highlightNavigation() {
        const scrollPos = window.pageYOffset + window.innerHeight / 3;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navbarLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to current section's nav link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Throttle scroll events for better performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(highlightNavigation);
            ticking = true;
            setTimeout(() => { ticking = false; }, 16);
        }
    }

    window.addEventListener('scroll', requestTick);

    // Tab functionality for Prague model courses
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.prep-card, .attraction-card, .restaurant-card, .cafe-card, .practical-card, .feature, .stat-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Scroll to top functionality
    function createScrollToTopButton() {
        const scrollButton = document.createElement('button');
        scrollButton.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollButton.className = 'scroll-to-top';
        scrollButton.setAttribute('aria-label', 'トップへ戻る');
        
        // Styles for the scroll button
        Object.assign(scrollButton.style, {
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '50px',
            height: '50px',
            backgroundColor: '#8B4513',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            zIndex: '1000',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        });

        scrollButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        scrollButton.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#DAA520';
            this.style.transform = 'scale(1.1)';
        });

        scrollButton.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#8B4513';
            this.style.transform = 'scale(1)';
        });

        document.body.appendChild(scrollButton);

        // Show/hide scroll button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollButton.style.display = 'flex';
            } else {
                scrollButton.style.display = 'none';
            }
        });
    }

    createScrollToTopButton();

    // Enhanced card hover effects
    const cards = document.querySelectorAll('.prep-card, .attraction-card, .restaurant-card, .cafe-card, .practical-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.2)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });

    // Loading animation for page elements
    function showElementsSequentially() {
        const sections = document.querySelectorAll('.section');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    // Initialize sequential loading
    const allSections = document.querySelectorAll('.section');
    allSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Start the sequential animation after a short delay
    setTimeout(showElementsSequentially, 300);

    // Search functionality (basic implementation)
    function createSearchBox() {
        const searchContainer = document.createElement('div');
        searchContainer.innerHTML = `
            <div class="search-box" style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                padding: 2rem;
                border-radius: 15px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                z-index: 2000;
                display: none;
                min-width: 300px;
            ">
                <h3 style="margin-bottom: 1rem; color: #8B4513;">ページ内検索</h3>
                <input type="text" id="search-input" placeholder="キーワードを入力..." style="
                    width: 100%;
                    padding: 0.8rem;
                    border: 2px solid #ddd;
                    border-radius: 8px;
                    font-size: 1rem;
                    margin-bottom: 1rem;
                ">
                <div style="display: flex; justify-content: space-between;">
                    <button id="search-btn" style="
                        background: #8B4513;
                        color: white;
                        border: none;
                        padding: 0.8rem 1.5rem;
                        border-radius: 8px;
                        cursor: pointer;
                    ">検索</button>
                    <button id="search-close" style="
                        background: #ccc;
                        color: black;
                        border: none;
                        padding: 0.8rem 1.5rem;
                        border-radius: 8px;
                        cursor: pointer;
                    ">閉じる</button>
                </div>
                <div id="search-results" style="
                    margin-top: 1rem;
                    max-height: 200px;
                    overflow-y: auto;
                "></div>
            </div>
            <div class="search-overlay" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 1999;
                display: none;
            "></div>
        `;

        document.body.appendChild(searchContainer);

        const searchBox = searchContainer.querySelector('.search-box');
        const searchOverlay = searchContainer.querySelector('.search-overlay');
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');
        const searchClose = document.getElementById('search-close');
        const searchResults = document.getElementById('search-results');

        // Keyboard shortcut to open search (Ctrl+F or Cmd+F)
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                e.preventDefault();
                showSearch();
            }
            if (e.key === 'Escape') {
                hideSearch();
            }
        });

        function showSearch() {
            searchBox.style.display = 'block';
            searchOverlay.style.display = 'block';
            searchInput.focus();
        }

        function hideSearch() {
            searchBox.style.display = 'none';
            searchOverlay.style.display = 'none';
            clearSearchResults();
        }

        function clearSearchResults() {
            searchResults.innerHTML = '';
            // Remove highlighting
            document.querySelectorAll('.search-highlight').forEach(el => {
                const parent = el.parentNode;
                parent.replaceChild(document.createTextNode(el.textContent), el);
                parent.normalize();
            });
        }

        function performSearch() {
            const query = searchInput.value.trim().toLowerCase();
            if (!query) return;

            clearSearchResults();

            const allText = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li');
            const results = [];

            allText.forEach(element => {
                const text = element.textContent.toLowerCase();
                if (text.includes(query) && element.offsetParent !== null) {
                    results.push({
                        element: element,
                        text: element.textContent.substring(0, 100) + '...',
                        section: findParentSection(element)
                    });

                    // Highlight the search term
                    highlightText(element, query);
                }
            });

            displaySearchResults(results, query);
        }

        function findParentSection(element) {
            let parent = element.parentElement;
            while (parent && !parent.hasAttribute('id')) {
                parent = parent.parentElement;
            }
            return parent ? parent.getAttribute('id') : 'unknown';
        }

        function highlightText(element, query) {
            const innerHTML = element.innerHTML;
            const regex = new RegExp(`(${query})`, 'gi');
            element.innerHTML = innerHTML.replace(regex, '<span class="search-highlight" style="background: yellow; padding: 2px;">$1</span>');
        }

        function displaySearchResults(results, query) {
            if (results.length === 0) {
                searchResults.innerHTML = '<p style="color: #666;">検索結果が見つかりませんでした。</p>';
                return;
            }

            const resultsHTML = results.slice(0, 10).map((result, index) => `
                <div style="
                    padding: 0.5rem;
                    border-bottom: 1px solid #eee;
                    cursor: pointer;
                    transition: background 0.3s ease;
                " class="search-result-item" data-section="${result.section}">
                    <strong>結果 ${index + 1}:</strong> ${result.text}
                </div>
            `).join('');

            searchResults.innerHTML = `
                <p style="margin-bottom: 0.5rem; font-weight: bold;">${results.length}件の結果が見つかりました</p>
                ${resultsHTML}
            `;

            // Add click listeners to results
            document.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('mouseover', function() {
                    this.style.backgroundColor = '#f0f0f0';
                });

                item.addEventListener('mouseout', function() {
                    this.style.backgroundColor = 'transparent';
                });

                item.addEventListener('click', function() {
                    const sectionId = this.getAttribute('data-section');
                    const section = document.getElementById(sectionId);
                    if (section) {
                        hideSearch();
                        const navbarHeight = document.querySelector('.navbar').offsetHeight;
                        const targetPosition = section.offsetTop - navbarHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }

        searchBtn.addEventListener('click', performSearch);
        searchClose.addEventListener('click', hideSearch);
        searchOverlay.addEventListener('click', hideSearch);

        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    createSearchBox();

    // Print functionality
    function addPrintButton() {
        const printButton = document.createElement('button');
        printButton.innerHTML = '<i class="fas fa-print"></i>';
        printButton.className = 'print-button';
        printButton.setAttribute('aria-label', 'ページを印刷');
        printButton.title = 'ページを印刷';
        
        Object.assign(printButton.style, {
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            width: '50px',
            height: '50px',
            backgroundColor: '#DAA520',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            zIndex: '1000',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        });

        printButton.addEventListener('click', function() {
            window.print();
        });

        printButton.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#B8860B';
            this.style.transform = 'scale(1.1)';
        });

        printButton.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#DAA520';
            this.style.transform = 'scale(1)';
        });

        document.body.appendChild(printButton);
    }

    addPrintButton();

    // Accessibility improvements
    function enhanceAccessibility() {
        // Skip link removed as it was causing visual issues

        // Improve keyboard navigation
        const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
        
        focusableElements.forEach(element => {
            element.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && this.tagName !== 'INPUT' && this.tagName !== 'TEXTAREA') {
                    this.click();
                }
            });
        });
    }

    enhanceAccessibility();

    // Performance monitoring
    function logPerformanceMetrics() {
        if ('performance' in window) {
            window.addEventListener('load', function() {
                setTimeout(function() {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
                    
                    if (loadTime > 3000) {
                        console.warn('Page load time is high:', loadTime + 'ms');
                    }
                }, 100);
            });
        }
    }

    logPerformanceMetrics();

    // Initialize tooltips for important information
    function initializeTooltips() {
        const tooltipElements = document.querySelectorAll('[title]');
        
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', function(e) {
                const tooltip = document.createElement('div');
                tooltip.className = 'custom-tooltip';
                tooltip.textContent = this.getAttribute('title');
                tooltip.style.cssText = `
                    position: absolute;
                    background: #333;
                    color: white;
                    padding: 5px 10px;
                    border-radius: 4px;
                    font-size: 12px;
                    z-index: 10000;
                    pointer-events: none;
                    white-space: nowrap;
                `;
                
                document.body.appendChild(tooltip);
                
                const rect = this.getBoundingClientRect();
                tooltip.style.left = rect.left + 'px';
                tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';
                
                this.setAttribute('data-original-title', this.getAttribute('title'));
                this.removeAttribute('title');
            });

            element.addEventListener('mouseleave', function() {
                const tooltip = document.querySelector('.custom-tooltip');
                if (tooltip) {
                    tooltip.remove();
                }
                
                if (this.getAttribute('data-original-title')) {
                    this.setAttribute('title', this.getAttribute('data-original-title'));
                    this.removeAttribute('data-original-title');
                }
            });
        });
    }

    initializeTooltips();

    // Lazy loading for images (if any are added later)
    function initializeLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    initializeLazyLoading();

    // Photo Detail Modal System
    function createPhotoDetailModal() {
        const modalHTML = `
            <div id="photo-detail-modal" class="photo-modal" style="display: none;">
                <div class="modal-overlay"></div>
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <div class="modal-header">
                        <h3 id="modal-title"></h3>
                        <span id="modal-type" class="type-badge"></span>
                    </div>
                    <div class="modal-body">
                        <img id="modal-image" src="" alt="" class="modal-photo">
                        <div class="modal-info">
                            <p id="modal-description"></p>
                            <div id="modal-details"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Add modal styles
        const modalStyles = `
            <style>
                .photo-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                    backdrop-filter: blur(5px);
                }
                
                .modal-content {
                    position: relative;
                    background: white;
                    border-radius: 16px;
                    max-width: 90vw;
                    max-height: 90vh;
                    overflow: hidden;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                    display: flex;
                    flex-direction: column;
                }
                
                .modal-close {
                    position: absolute;
                    top: 1rem;
                    right: 1rem;
                    background: rgba(0, 0, 0, 0.5);
                    color: white;
                    border: none;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    font-size: 24px;
                    cursor: pointer;
                    z-index: 10;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .modal-header {
                    padding: 2rem;
                    border-bottom: 1px solid #eee;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .modal-body {
                    display: flex;
                    flex: 1;
                    min-height: 0;
                }
                
                .modal-photo {
                    width: 60%;
                    height: 500px;
                    object-fit: cover;
                }
                
                .modal-info {
                    width: 40%;
                    padding: 2rem;
                    overflow-y: auto;
                }
                
                @media (max-width: 768px) {
                    .modal-content {
                        max-width: 95vw;
                        max-height: 95vh;
                    }
                    
                    .modal-body {
                        flex-direction: column;
                    }
                    
                    .modal-photo {
                        width: 100%;
                        height: 300px;
                    }
                    
                    .modal-info {
                        width: 100%;
                        padding: 1rem;
                    }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', modalStyles);
        
        // Event listeners
        const modal = document.getElementById('photo-detail-modal');
        const overlay = modal.querySelector('.modal-overlay');
        const closeBtn = modal.querySelector('.modal-close');
        
        function closeModal() {
            modal.style.display = 'none';
        }
        
        overlay.addEventListener('click', closeModal);
        closeBtn.addEventListener('click', closeModal);
        
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display !== 'none') {
                closeModal();
            }
        });
        
        return modal;
    }

    // Attraction Visual Management - Using Real Photos
    function initializeAttractionImages() {
        // Attraction information with photos and detailed info
        const attractionData = {
            // Vienna attractions
            'schonbrunn': {
                icon: 'fas fa-crown',
                color: '#f39c12',
                title: 'シェーンブルン宮殿',
                description: 'ハプスブルク家の夏の離宮として建設された、オーストリア帝国の栄華を物語る壮麗な宮殿',
                type: 'palace',
                image: 'images/vienna/attractions/schonbrunn-palace.jpg',
                details: {
                    '概要': 'ウィーン市街から約6km南西、1696年に建設が開始されたバロック様式の離宮。マリア・テレジア女帝時代に現在の姿に拡張され、ハプスブルク家の夏の居住地として使用された。現在はユネスコ世界遺産に登録され、年間約400万人が訪れる。',
                    '建築規模': '宮殿本体1,441室、敷地面積160ヘクタールという巨大な複合施設。正面幅180m、奥行120mの本館に加え、バロック式庭園、グロリエッテ、世界最古の動物園を含む。',
                    '見学コース': {
                        'インペリアルツアー': '22室見学・約60分・€27。フランツ・ヨーゼフ皇帝とエリーザベト皇后の私室を中心とした基本コース。',
                        'グランドツアー': '40室見学・約90分・€34。マリア・テレジアの大広間や鏡の間を含む充実コース。初回訪問者におすすめ。',
                        'シシィ・チケット': '€51.00で1年間有効、時間指定不要。ホーフブルク王宮との共通券として最も柔軟性が高い。'
                    },
                    '庭園見どころ': {
                        'バロック式庭園': '幾何学的に設計された美しい庭園。季節の花々と彫刻が調和した芸術作品。',
                        'グロリエッテ': '丘の上の凱旋門風建造物。内部カフェと展望台からウィーン市街の絶景を一望。',
                        'ネプチューンの噴水': '海神ネプチューンを中心とした壮大な噴水。夏期の噴水ショーは必見。',
                        '迷路庭園': '1720年代に造られた生垣の迷路。家族連れに人気のアトラクション。'
                    },
                    '訪問戦略': '最低半日、理想的には丸一日を確保。朝一番（8:30開館）に入場し、グランドツアー → 庭園散策 → グロリエッテ → 動物園の順序が効率的。シシィ・チケットなら時間に縛られず、複数回訪問も可能。',
                    '料金情報': '宮殿単体€27-34、庭園込み€37-44、年間パス€53。オンライン購入で€2-3割引。グロリエッテ展望台は別途€4.50。',
                    アクセス: 'U4線シェーンブルン駅徒歩5分、またはトラム10・58番シェーンブルン駅。市内中心部から約30分。専用駐車場あり（€6/日）。'
                }
            },
            'hofburg': {
                icon: 'fas fa-university',
                color: '#8e44ad',
                title: 'ホーフブルク王宮',
                description: '600年にわたってハプスブルク家の権力の座であり続けた「都市の中の都市」',
                type: 'palace',
                image: 'images/vienna/attractions/hofburg-palace.jpg',
                details: {
                    '概要': 'ウィーン市内中心部に位置する、240,000平方メートルの巨大な宮殿複合体。13世紀から20世紀まで歴代皇帝の居住地として使用され、現在はオーストリア大統領官邸としても機能している。18の建物群、19の中庭、2,600室からなる「帝国の心臓部」。',
                    '主要施設': {
                        '皇帝の部屋': 'フランツ・ヨーゼフ皇帝とエリーザベト皇后の私的居住空間。19世紀の宮廷生活を垣間見ることができる。皇帝の質素な書斎と皇后の豪華な化粧室の対比が印象的。',
                        'シシィ博物館': '美貌の皇后エリーザベト（シシィ）の生涯を展示。暗殺時の血染めの衣服、美容への執着を示す体重計、詩作品など、神話化された皇后の実像に迫る。',
                        '王宮宝物館': '神聖ローマ帝国皇帝の帝冠、オーストリア帝国の帝冠など、1000年の帝国史を物語る至宝を展示。世界で最も価値ある宝物コレクションの一つ。',
                        'スペイン乗馬学校': '450年の伝統を誇る古典馬術の殿堂。リピッツァナー種の白馬による優雅な演技は「生きた芸術」として世界的に有名。'
                    },
                    '国立図書館': '世界で最も美しい図書館の一つ「プルンクザール」。バロック建築の傑作で、フレスコ画に囲まれた20万冊の蔵書は圧巻。カール6世の図書館として1726年完成。',
                    '見学戦略': 'シシィ・チケット（€51）が最も効率的。皇帝の部屋・シシィ博物館・王宮宝物館を1年間有効で見学可能。興味に応じて施設を選択し、最低3-4時間は確保したい。',
                    '隠れた見どころ': {
                        'ヘルデンプラッツ': '英雄広場。ナポレオン戦争の英雄オイゲン公とカール大公の騎馬像。ヒトラーの演説場所としても歴史的意味を持つ。',
                        'ミヒャエル門': '帝国時代の正門。考古学遺跡と現代建築が共存する独特な空間。',
                        'ブルク庭園': '皇宮庭園。モーツァルト記念碑があり、市民の憩いの場として親しまれている。'
                    },
                    '料金とアクセス': '各施設€12-15、シシィ・チケット€51が最もお得。地下鉄U3線ヘレンガッセ駅徒歩3分。リンク通り沿いで市内観光の起点として最適。'
                }
            },
            'belvedere': {
                icon: 'fas fa-seedling',
                color: '#27ae60',
                title: 'ベルヴェデーレ宮殿',
                description: 'プリンツ・オイゲン公の夏の離宮として建設されたバロック建築の最高傑作',
                type: 'palace',
                image: 'images/vienna/attractions/belvedere-palace.jpg',
                details: {
                    '概要': 'オーストリア軍の英雄プリンツ・オイゲン公（1663-1736）が築いた夏の離宮。バロック建築の巨匠ヨハン・ルーカス・フォン・ヒルデブラントによる設計で、1714-1723年に建設された。上宮と下宮の2つの宮殿と、それらを結ぶヨーロッパ最高峰のバロック式庭園で構成される。',
                    '建築的特徴': {
                        '設計者': 'ヨハン・ルーカス・フォン・ヒルデブラント（カルロ・フォンターナの弟子）',
                        '建設期間': '1712-1716年（下宮）、1717-1723年（上宮）',
                        '建築様式': 'オーストリア・バロック様式の最高峰。装飾的なファサード、大階段、詳細な漆喰装飾が特徴',
                        '主要部屋': 'マルモール・ザール（大理石の間）、サラ・テレーナ（地上階大広間）、皇室の謁見室'
                    },
                    '美術館コレクション': {
                        'クリムト・コレクション': '世界最大の24作品を所蔵。「接吻」（1908/09年、180×180cm）はオーストリア最高の国宝',
                        'ウィーン世紀末芸術': 'エゴン・シーレ、オスカー・ココシュカ、リヒャルト・ゲルストルなど',
                        '印象派コレクション': 'モネ、ルノワール、ヴァン・ゴッホの重要作品',
                        '中世〜バロック': '中世から現代まで、オーストリア美術史の全貌を網羅'
                    },
                    '庭園芸術': {
                        '設計者': 'ドミニク・ジラール（ヴェルサイユ宮殿の庭園設計で修業）',
                        '特徴': 'フランス式バロック庭園。完璧な左右対称設計、3段のテラス構造',
                        '彫刻群': '四大陸の寓意像、アポロとヘラクレス像などマルクス・アントニオ・チャルリ作品',
                        'アトランティスの噴水': '神話的人物群の壮大な噴水、見事な水景技術',
                        'カナレット・ビュー': '上宮からウィーン市街を望む絶景ポイント'
                    },
                    '歴史的意義': {
                        '軍事的英雄': 'プリンツ・オイゲン公はハプスブルク帝国の救国英雄。オスマン帝国との戦争で活躍',
                        '文化的貢献': '戦場の英雄でありながら芸術愛好家。ヨーロッパ有数の美術コレクターでもあった',
                        '宮廷外交': '宮殿は国際的な外交・文化交流の中心地として機能',
                        '美術館の先駆け': '1781年マリア・テレジア女帝により世界初の公開美術館の一つとなる'
                    },
                    '2025年特別展': {
                        'IN-SIGHT: Gustav Klimt': '2025年5月15日〜10月5日（上宮）',
                        'Gustav Klimt - Pigment & Pixel': '2025年2月20日〜9月7日（下宮）'
                    },
                    '見学戦略': '上宮でクリムト「接吻」は必見。下宮は特別展を要チェック。庭園散策込みで半日確保。3 in 1 Day Ticketで全施設見学が効率的。',
                    '開館時間': '上宮：毎日9:00-18:00、下宮：毎日10:00-18:00',
                    アクセス: 'トラムD・71番プリンツ・オイゲン・シュトラーセ駅下車。中央駅から徒歩15分。リンク通りから徒歩圏内。'
                }
            },
            'stephansdom': {
                icon: 'fas fa-church',
                color: '#e74c3c',
                title: 'シュテファン大聖堂',
                description: 'ウィーンの象徴的な大聖堂',
                type: 'church',
                image: 'images/vienna/attractions/stephansdom-cathedral.jpg',
                details: {
                    height: '南塔136.44メートル',
                    roof: '230,000枚の色鮮やかなタイル',
                    bell: 'プンメリンの鐘（北塔）',
                    highlights: ['南塔展望台', 'カタコンベ', 'モザイク屋根', '内部装飾']
                }
            },
            'kunsthistorisches': {
                icon: 'fas fa-palette',
                color: '#3498db',
                title: 'ウィーン美術史美術館',
                description: 'ハプスブルク家コレクションを基盤とする世界屈指の美術館。ブリューゲル、フェルメール、ティツィアーノ、ルーベンス等の巨匠作品と70万点を超える美術品を収蔵。',
                type: 'museum',
                image: 'images/vienna/museums/kunsthistorisches-museum.jpg',
                details: {
                    '歴史と建築': '1891年開館、フランツ・ヨーゼフ皇帝とマリア・テレジア女帝の記念碑的美術館建築。ゴットフリート・ゼンパーとカール・フォン・ハーゼナウアー設計によるネオ・ルネサンス様式の壮麗な宮殿建築。リングシュトラーセの文化地区中心に位置し、自然史博物館と対をなす双子建築として都市景観を形成。',
                    '絵画ギャラリー': '2階に展開する世界最高水準のコレクション。フェルメール「絵画芸術」（アレゴリー）、世界最大のブリューゲル・コレクション（「バベルの塔」「農夫の婚礼」含む16点）、ティツィアーノ、ルーベンス、レンブラント、ラファエロ、デューラーの巨匠作品群。ハプスブルク家500年の美的センスが結集。',
                    クンストカンマー: '2013年リニューアルした至宝の間。中世からバロック期にハプスブルク皇帝・大公が収集した2,200点の工芸品・科学機器・芸術作品。ベンヴェヌート・チェッリーニの黄金塩入れ、象牙彫刻、時計、天体儀など、ルネサンス期の万能天才たちの創造力を具現化。',
                    '古代コレクション': 'エジプト・オリエント、ギリシア・ローマの古代文明コレクション。17,000点を超える遺物でエジプト・中東、ギリシア・ローマ文明を網羅。「ゲンマ・アウグスタ」（アウグストゥス皇帝のカメオ）は古代ローマ最高傑作の浮彫宝石。',
                    '実用的見学情報': '火-日曜10:00-18:00開館（金曜21:00まで延長）、月曜休館（夏季6-8月は月曜も開館）。一般€20、シニア（65歳以上）€15、19歳未満無料。全88室、少なくとも3時間必要。日本語オーディオガイド利用推奨。',
                    '見学戦略': '2階絵画ギャラリーから開始、ブリューゲル室→ フェルメール→ ティツィアーノ→ ルーベンスの順序推奨。混雑する午後より午前中（特に平日10-12時）が最適。1階クンストカンマーは午後の混雑回避時間帯として活用。',
                    '特別展示': '年間を通じて企画展開催。2025年は「ミヒャエリーナ・ワウティエ展」（2026年2月まで）、「ピーテル・クラース静物画展」（2026年1月まで）など。特別展は追加料金が必要な場合があるため事前確認推奨。',
                    '周辺との連携': 'マリア・テレジア広場を挟んで自然史博物館と隣接、共通券利用可能。国立歌劇場まで徒歩5分、アルベルティーナ美術館まで徒歩10分で美術館巡りに最適立地。ウィーン・ミュージアム・パス（年間券）で7つの主要博物館入場可能。'
                }
            },
            // Prague attractions
            'prague-castle': {
                icon: 'fas fa-chess-rook',
                color: '#e67e22',
                title: 'プラハ城',
                description: 'ギネス認定の世界最大の城郭複合体（約7万㎡）。880年頃にプシェミスル朝のボジヴォイ公によって建設され、1000年以上にわたりチェコの政治・文化の中心地として機能。UNESCO世界遺産。',
                type: 'castle',
                image: 'images/prague/attractions/prague-castle.jpg',
                details: {
                    歴史と建築: '880年頃にプシェミスル朝のボジヴォイ公により建設開始。10世紀のロマネスク様式の遺構から14世紀のゴシック改築まで、様々な建築様式が融合。第一共和国時代（1918-1938）にはスロベニア人建築家ヨジップ・プレチニクが大規模改修を実施。約7万平方メートルの敷地は世界最大の城郭複合体としてギネスブック認定。神聖ローマ皇帝、ボヘミア王、チェコスロバキア大統領、現チェコ共和国大統領の居住地として1000年以上機能。',
                    聖ヴィート大聖堂: 'プラハ城の中心的建造物。1344年建設開始、1929年完成のゴシック建築の最高傑作。高さ96.6mの尖塔はプラハのシンボル。ミュシャ作のステンドグラス、聖ヤン・ネポムツキーの銀の廟、歴代ボヘミア王の墓所が見どころ。王冠宝物庫も併設。',
                    旧王宮: 'ボヘミア王の居住地として使用された宮殿。特に「ヴラディスラフ・ホール」は中世ヨーロッパ最大の世俗ホールで、馬上槍試合も行われた。1618年の「プラハ窓外投擲事件」の現場でもあり、三十年戦争の発端となった歴史的意義を持つ。',
                    黄金小路: '16世紀に城の守衛や職人が住んだカラフルな小さな家々が並ぶ通り。錬金術師が住んだという伝説から「黄金小路」と呼ばれる。作家フランツ・カフカが1916-1917年に22番地に住んでいたことでも有名。現在は土産物店や展示室として利用。',
                    聖イジー教会: 'プラハ城内最古の教会（973年創建）で、ボヘミア最初の修道院。ロマネスク様式の傑作建築で、17世紀に付加された赤いバロック・ファサードと対照的な質素な内部が印象的。プシェミスル朝の君主墓所や美しいフレスコ画を保存。現在は国立博物館の古代美術コレクションを展示。',
                    プラハ城絵画館: 'チェコ最古の絵画館で、15-18世紀のヨーロッパ絵画コレクションを展示。神聖ローマ皇帝ルドルフ2世の著名なコレクションを含む貴重な作品群。ティツィアーノ、ティントレット、ルーベンスなどの巨匠作品を収蔵。常設展示は小規模だが、質の高い作品を厳選展示。',
                    ロブコヴィッツ宮殿: '城内唯一の私有建物で、ロブコヴィッツ家のプライベート・コレクションを展示する博物館を併設。音楽関連では世界初のベートーヴェン交響曲第9番「合唱」の楽譜原稿やモーツァルトの作品を展示。美術品、装飾芸術、歴史的遺物まで幅広いコレクション。',
                    '見学戦略': 'メインコース（チケットB：450 CZK）で主要施設見学可能。朝9時開門直後の入場で混雑回避。推奨ルート：第三の中庭（聖ヴィート大聖堂）→ 旧王宮 → 聖イジー教会 → 黄金小路 → ダリボルカ塔。所要時間3-4時間（詳細見学なら5-6時間）。チケットは2日間有効で各建物1回入場可能。',
                    '季節と開館時間': '4-10月：城郭複合体6:00-22:00、歴史的建造物9:00-17:00｜11-3月：城郭複合体6:00-22:00、歴史的建造物9:00-16:00。城郭の敷地、中庭、庭園（衛兵交代式を含む）への入場は無料。春夏は王宮庭園、南庭園も開放され、プラハ市街のパノラマが楽しめる。',
                    '撮影スポット': {
                        '第三の中庭': '聖ヴィート大聖堂の全景と旧市街方面の眺望',
                        '南庭園': 'バロック庭園からプラハ市街とヴルタヴァ川のパノラマ（春夏限定）',
                        '王宮庭園': 'ルネサンス様式庭園と城の背面景観（追加料金・期間限定）',
                        '黄金小路': 'カラフルな小屋群とダリボルカ塔の組み合わせ'
                    },
                    '実用情報': 'トラム22番「Pražský hrad」駅下車徒歩2分。オーディオガイド（8言語対応：チェコ語、英語、フランス語、ドイツ語、イタリア語、スペイン語、ロシア語、韓国語）200 CZK推奨。オンライン事前予約で入場時間指定可能（特に夏季推奨）。早朝・夕方は混雑回避と美しい光条件で撮影に最適。衛兵交代式は毎正時に第一の中庭で実施。'
                }
            },
            'charles-bridge': {
                icon: 'fas fa-bridge-circle-check',
                color: '#2c3e50',
                title: 'カレル橋',
                description: '1357年カレル4世により建設開始、1402年完成。全長516m、16のアーチを持つゴシック石橋の傑作。30体のバロック聖人像が並ぶ「屋外美術館」として650年以上プラハのシンボル。',
                type: 'bridge',
                image: 'images/prague/attractions/charles-bridge.jpg',
                details: {
                    '建設と歴史': '神聖ローマ皇帝カレル4世により1357年7月9日午前5時31分に建設開始（数字の美しい並びで選ばれた時刻）。建設期間45年、1402年に完成。前身のユディット橋（1158-1172年建設）が1342年の大洪水で損壊したため建設。1870年まで「石橋」「プラハ橋」と呼ばれ、1841年まで唯一のヴルタヴァ川架橋。全長516m、幅9.5m、高さ13m、16のアーチと15の橋脚で構成。ボヘミア砂岩で建設された中世建築の傑作。',
                    '聖人像群': '欄干に並ぶ30体のバロック彫刻群（1683-1714年制作）。マティアス・ブラウン、ヤン・ブロコフとその息子ミハエル・ヨーゼフ、フェルディナント・マクシミリアンら当時最高の彫刻家が手がけた。1965年から順次レプリカに交代、オリジナルは国立博物館ラピダリウムで保存。最著名な聖ヤン・ネポムツキー像（1683年）の台座ブロンズレリーフに触れると幸運が訪れるとされ、多くの観光客が列を作る。',
                    '橋塔群': {
                        '旧市街橋塔': 'ペトル・パルレーシュ設計による14世紀末完成のゴシック建築傑作。「世界で最も美しいゴシック塔」と称される。高さ47m、内部博物館では橋の歴史を展示、最上階展望台からのパノラマは絶景。入場料190 CZK。',
                        'マラー・ストラナ橋塔': '2つの塔で構成：12世紀のロマネスク様式ユディット塔（旧橋の遺構）と15世紀の高い新ゴシック塔。2つの塔はアーチで連結され、新塔からプラハ城方面の眺望が素晴らしい。入場料190 CZK。'
                    },
                    '最適撮影時間': {
                        '朝焼け': '6:00-7:00。観光客が少なく、朝霧とゴールデンライトが幻想的。特に秋冬がベスト。',
                        '夕景': '19:00-20:00（夏期）。プラハ城がライトアップされ、橋も温かい光に包まれる。',
                        'ブルーアワー': '日没後30分。空の青と街灯のオレンジのコントラストが美しい。'
                    },
                    歴史の舞台: '1621年、白山の戦いで敗れたプロテスタント貴族27人の首が橋塔に晒された。1648年にはスウェーデン軍の侵攻をプラハ市民が阻止した「カレル橋の戦い」の舞台。現在も数多くの映画のロケ地として使用される。',
                    路上アーティスト: '日中は画家、音楽家、人形劇師などが芸を披露。特に「プラハの春」音楽祭期間中（5-6月）は質の高い演奏が楽しめる。投げ銭文化なので気に入ったら小額を。',
                    混雑回避法: '早朝6-8時、夜21時以降が狙い目。日中（10-18時）は非常に混雑。雨の日は観光客が減り、濡れた石畳が美しい反射を作る穴場タイム。',
                    周辺スポット: 'カンパ島（橋の下の中州、現代アート展示）、レノン・ウォール（平和のメッセージが描かれた壁）、ヴルタヴァ川クルーズ乗り場まで徒歩圏内。',
                    現代の橋: '1965年に車両通行禁止、歩行者専用橋として24時間無料開放。東西ヨーロッパを繋ぐ重要な交易路として機能した歴史を持ち、現在は年間数百万人が訪れる世界的観光地。数多くの映画ロケ地としても使用され、「ヨーロッパで最も美しい橋」とも称される。',
                    文化的意義: '650年以上にわたりプラハの象徴として機能。橋上では日々、画家、音楽家、大道芸人が芸術を披露し、「屋外美術館」としての役割も果たす。特に「プラハの春」音楽祭期間中（5-6月）は質の高い路上演奏が楽しめる。投げ銭文化があり、気に入った演奏には小額の寄付を。'
                }
            },
            'old-town-square': {
                icon: 'fas fa-clock',
                color: '#f39c12',
                title: '旧市街広場',
                description: '600年の歴史を持つ天文時計「オルロイ」で世界的に有名なプラハの心臓部。12世紀から商業中心地として発展し、ゴシック・バロック・ロマネスク様式の建築群が取り囲む。',
                type: 'square',
                image: 'images/prague/attractions/old-town-square.jpg',
                details: {
                    歴史と発展: '12世紀に商業市場として設立、14世紀にカレル4世により都市権を獲得。神聖ローマ帝国時代には中欧最重要の商業中心地。20世紀まで処刑場としても使用され、1621年に白山の戦いで敗れた27人のプロテスタント貴族が処刑された歴史的舞台。現在は年間数百万人が訪れる世界的観光地。',
                    天文時計オルロイ: '1410年設置、現存する世界3番目に古い天文時計で現在も稼働中。時計師ミクラーシュ・ズ・カダニェと天文学者ヤン・シンデルが制作。天文盤（上部）では太陽・月・地球・黄道12宮の位置を表示、暦盤（下部・1490年追加）は月別の農作業を描写。毎正時9:00-23:00に12使徒の人形劇（45秒間）を上演。',
                    建築群の傑作: {
                        'ティーン教会': '14-16世紀建設のゴシック建築、80mの双塔がプラハのスカイラインを形成。内部には天文学者ティコ・ブラーエの墓。',
                        '聖ニコライ教会': '18世紀バロック建築、キリアン・イグナーツ・ディーンツェンホーファー設計。華麗な内装とクリスタル・シャンデリア。',
                        '旧市庁舎': '1338年設立、ゴシック塔（69m）は町の権力象徴。チェコ最古の自治機構で現在も市議会として機能。'
                    },
                    文化的意義: 'ヤン・フス記念碑（1915年建立）は宗教改革者を記念し、チェコ・ナショナリズムの象徴。毎年クリスマス・イースター市場が開催され、中世の雰囲気を再現。周囲のパステルカラーのバロック建築群が調和美を創出。',
                    見学のポイント: '天文時計は毎時正確に作動、15分前から観光客が集まるため早めの場所取り推奨。旧市庁舎塔の展望台（入場料250 CZK）からはプラハ全景のパノラマが楽しめる。夜間はライトアップされ、昼間とは異なる幻想的な美しさを演出。',
                    周辺の魅力: '石の鐘の家（14世紀、現代美術展示）、キンスキー宮殿（国立美術館分館）、一分の家（ルネサンス・スグラフィート装飾）など歴史的建造物が点在。カフェ・レストランも充実し、テラス席からは広場の活気を眺めながら食事可能。'
                }
            },
            'tyn-church': {
                icon: 'fas fa-church',
                color: '#8e44ad',
                title: 'ティーン教会',
                description: '特徴的な双塔を持つ教会',
                type: 'church',
                image: 'images/prague/attractions/tyn-church.jpg',
                details: {
                    official: '聖母マリア被昇天教会',
                    towers: '高さ約80メートルの双塔',
                    style: 'ゴシック建築の傑作',
                    highlights: ['双塔', '内部装飾', 'バロック祭壇', '天体暦学者ティコ・ブラーエの墓']
                }
            },
            'vitus-cathedral': {
                icon: 'fas fa-church',
                color: '#2c3e50',
                title: '聖ヴィート大聖堂',
                description: 'プラハ城内の壮麗な大聖堂',
                type: 'cathedral',
                image: 'images/prague/attractions/st-vitus-cathedral.jpg',
                details: {
                    construction: '1344年建設開始、1929年完成',
                    style: 'ゴシック建築の最高傑作',
                    features: 'ステンドグラス、聖ヤン・ネポムツキーの墓',
                    highlights: ['ステンドグラス', '聖ヤン・ネポムツキー廟', '王冠宝物庫', 'バロック祭壇']
                }
            },
            // Museums and cultural venues
            'albertina': {
                icon: 'fas fa-palette',
                color: '#9b59b6',
                title: 'アルベルティーナ美術館',
                description: 'グラフィック・アートの殿堂',
                type: 'museum',
                image: 'images/vienna/museums/albertina-museum.jpg',
                details: {
                    collection: '版画・素描100万点以上',
                    famous: 'デューラー「野兎」、ピカソ・モネコレクション',
                    special: '写真コレクション、現代美術',
                    highlights: ['デューラー作品', 'モネ睡蓮', 'ピカソ素描', '写真展示']
                }
            },
            'mozart-house': {
                icon: 'fas fa-music',
                color: '#e67e22',
                title: 'モーツァルトハウス・ウィーン',
                description: 'モーツァルトの生活と創作の場',
                type: 'museum',
                image: 'images/vienna/music/mozart-house.jpg',
                details: {
                    location: 'ドムガッセ5番地',
                    period: '1784-1787年モーツァルト居住',
                    famous: '「フィガロの結婚」作曲の場',
                    highlights: ['当時の生活空間', '手稿譜', '楽器展示', 'オペラ体験コーナー']
                }
            },
            'state-opera': {
                icon: 'fas fa-theater-masks',
                color: '#c0392b',
                title: 'ウィーン国立歌劇場',
                description: '世界で最も権威があり、最も活発なオペラハウスの殿堂',
                type: 'theater',
                image: 'images/vienna/music/vienna-state-opera.jpg',
                details: {
                    概要: 'リング通りに君臨する世界最高峰のオペラハウス。1869年開場以来、モーツァルトから現代作品まで幅広いレパートリーで世界中の音楽ファンを魅了。年間200公演を超える膨大な上演数を誇り、世界最高の歌手・指揮者・演出家が集結する聖地。',
                    '建築・歴史': {
                        '建築様式': 'ネオ・ルネサンス様式。建築家アウグスト・ジッカード・フォン・ジッカルツブルクとエドゥアルト・ファン・デア・ニュルによる設計',
                        '開場': '1869年5月25日、モーツァルト「ドン・ジョヴァンニ」で開場',
                        '戦災と復興': '1945年爆撃で大部分損壊。1955年11月5日、ベートーヴェン「フィデリオ」で再開場',
                        '歴史的意義': '初期は「沈んだ宝箱」と揶揄されたが、グスタフ・マーラー総監督時代（1897-1907）から黄金期へ'
                    },
                    施設詳細: {
                        '収容人数': '2,200席＋立ち見席435席',
                        '舞台': '世界最大級の可動舞台システム',
                        'ロジア': 'リング通りに面した中央ファサードの壮大なロジア（廊下）',
                        'シュヴィント・ホワイエ': '画家モリッツ・フォン・シュヴィントによる「魔笛」壁画で装飾',
                        'ゴブラン・ホール': '貴重な18世紀ゴブラン織で装飾された豪華絢爛な空間',
                        '階段': '7つの自由技芸を象徴する大理石像が並ぶ威厳ある大階段'
                    },
                    'レパートリー・運営': {
                        '年間公演数': '約200公演（オペラ・バレエ）、世界最大のレパートリー',
                        'シーズン': '9月〜6月、夏期（7-8月）は休演期間',
                        '特色': '毎日異なる演目を上演する「レパートリー・システム」',
                        'ウィーン・フィル': 'ウィーン・フィルハーモニー管弦楽団の母体オーケストラ',
                        'ウィーン国立バレエ': '世界トップクラスのバレエ団が本拠地とする'
                    },
                    チケット戦略: {
                        '正規席券': '€15-300以上。人気演目は数ヶ月前完売。公式サイトで2ヶ月前発売開始',
                        '立ち見席の魅力': '€15-18程度で世界最高峰の舞台芸術を体験できる奇跡のシステム',
                        '立ち見券購入法': '公演当日10:00からオンライン、開演80分前から現地専用窓口',
                        '場所取り慣習': 'スカーフやハンカチで場所取り。早めの到場が必要',
                        '服装': '正規席はエレガント推奨、立ち見席は比較的カジュアルOK'
                    },
                    ガイドツアー: {
                        '開催': '公演のない日中に毎日開催',
                        '内容': '豪華絢爛な内装、舞台裏、貴賓室、歴史解説',
                        '予約': '公式サイトまたは現地で予約可能',
                        '料金': '大人€12程度（要最新確認）'
                    },
                    '2025年注目公演': {
                        '人気レパートリー': 'モーツァルト三大オペラ、ヴェルディ、プッチーニ作品',
                        'ウィーン舞踏会シーズン': '1-2月、オペラ座舞踏会（2月第2木曜）は社交界最高峰',
                        '新制作': '毎シーズン数本の新演出作品を世界初演'
                    },
                    実用情報: {
                        '住所': 'Opernring 2, 1010 Wien',
                        'アクセス': 'U1/U2/U4線カールスプラッツ駅、トラム1・2・71・D線オーパー駅',
                        '公式サイト': 'www.wiener-staatsoper.at',
                        '注意事項': '開演後の入場制限あり、途中退場は休憩時のみ可能'
                    },
                    音楽愛好家への提言: '立ち見席制度を知っているかどうかで、ウィーンでの文化体験の可能性は劇的に変わる。これは予算に限りがある旅行者にとって最も価値ある「裏技」であり、ウィーン音楽文化の懐の深さを象徴する制度である。'
                }
            },
            'philharmonic': {
                icon: 'fas fa-music',
                color: '#f39c12',
                title: 'ウィーン楽友協会（黄金ホール）',
                description: '世界で最も美しいコンサートホール',
                type: 'concert-hall',
                image: 'images/vienna/music/vienna-philharmonic.jpg',
                details: {
                    opened: '1870年開場',
                    famous: 'ニューイヤーコンサート会場',
                    acoustics: '世界最高の音響',
                    highlights: ['黄金装飾', 'ウィーン・フィル定期', 'ガイドツアー', '音響体験']
                }
            },
            // Cafes
            'sacher': {
                icon: 'fas fa-coffee',
                color: '#8b4513',
                title: 'カフェ・ザッハー',
                description: '1832年創業、オリジナル・ザッハトルテ発祥の地として世界的に有名な老舗カフェ',
                type: 'cafe',
                image: 'images/vienna/cafes/cafe-sacher.jpg',
                details: {
                    概要: 'オペラ座向かいの5つ星ホテル・ザッハー内にある、ウィーンで最も有名なカフェ。1832年にフランツ・ザッハーが開業し、息子エドゥアルトが考案したザッハトルテは今なお門外不出のレシピで作られる。赤いビロードと金の装飾が美しい帝国様式の内装。',
                    ザッハトルテの歴史: '1832年、16歳の見習いフランツ・ザッハーがメッテルニヒ公のためにチョコレートケーキを考案。息子エドゥアルトが改良を加え現在の形に。デメルとの「ザッハトルテ論争」（1962-1965年）を経て、「オリジナル・ザッハトルテ」の名称を獲得。',
                    メニューハイライト: {
                        'オリジナル・ザッハトルテ': '€7.50（ホイップクリーム付き）。チョコレートスポンジにアプリコットジャム、グラスール（チョコレート糖衣）の三層構造。甘さ控えめで上品な味わい。',
                        'ウィンナーコーヒー': '€6.20-€8.90。エスプレッソベースにホイップクリーム。メランジュ、アインシュペナー、ファリゼーなど伝統的なバリエーション豊富。',
                        'その他デザート': 'アップルシュトゥルーデル（€6.50）、インペリアルトルテ（€7.50）など、宮廷菓子の伝統を継承。'
                    },
                    内装と雰囲気: '深紅のビロード張りの椅子、金装飾のミラー、クリスタルシャンデリアが織りなす豪華絢爛な空間。ウィーン宮廷文化の粋を集めた「生きた博物館」。ドレスコードはスマートカジュアル推奨。',
                    訪問のコツ: {
                        '予約': '観光シーズンは要予約（+43-1-514560）。午後3-5時のティータイムは特に混雑。',
                        '最適時間': '朝10-11時または夕方6時以降が比較的空いている。',
                        '座席選択': '窓際席はオペラ座を眺めながらカフェタイムを楽しめる特等席。',
                        'お土産': 'オリジナル・ザッハトルテ（€22-32）は専用木箱入りで世界配送可能。'
                    },
                    料金とアクセス: 'ケーキセット€13-16、朝食€18-25。地下鉄U1/U2/U4線カールスプラッツ駅徒歩3分。オペラ座隣接で観光拠点として最適。',
                    文化的意義: '皇帝フランツ・ヨーゼフも愛用した宮廷御用達カフェ。多くの著名人が訪れ、アンナ・ネトレプコ、ヨーヨー・マなど現代の巨匠も常連。ウィーンカフェ文化の象徴的存在。'
                }
            },
            'demel': {
                icon: 'fas fa-birthday-cake',
                color: '#ff69b4',
                title: 'デメル',
                description: '帝室御用達の老舗菓子店',
                type: 'cafe',
                image: 'images/vienna/cafes/demel-cafe.jpg',
                details: {
                    founded: '1786年創業',
                    status: '元帝室御用達菓子店',
                    famous: 'アンナトルテ、ザッハトルテ論争',
                    highlights: ['アンナトルテ', '手作りケーキ', 'ショーケース見学', '伝統レシピ']
                }
            },
            // Prague cafes
            'louvre': {
                icon: 'fas fa-coffee',
                color: '#2c3e50',
                title: 'カフェ・ルーヴル',
                description: '1902年開業、カフカやアインシュタインが愛した知識人の聖地。アール・ヌーヴォーの美しい内装',
                type: 'cafe',
                image: 'images/prague/cafes/cafe-louvre.jpg',
                details: {
                    概要: 'ナロードニー通りに面する、プラハで最も歴史と文化的価値の高いカフェの一つ。1902年の開業以来、作家、哲学者、科学者、芸術家が集う「知識人のサロン」として機能。アール・ヌーヴォー様式の美しい内装と、当時のままのビリヤード台が往時を偲ばせる。',
                    歴史的背景: '20世紀初頭、オーストリア＝ハンガリー帝国下のプラハで、チェコ語での知的討論が盛んに行われた場所。第一次大戦後のチェコスロバキア独立時代、共産主義時代、そして民主化後の現在まで、一世紀以上にわたって市民に愛され続けている。',
                    著名な常連客: {
                        'フランツ・カフカ': '「変身」「審判」の作家。友人マックス・ブロートと頻繁に訪れ、文学論を交わした。カフカの日記にもカフェ・ルーヴルへの言及が多数。',
                        'アルベルト・アインシュタイン': '1911-1912年にプラハ・ドイツ大学教授時代の常連。相対性理論の発展期に、ここで思索を深めたという逸話が残る。',
                        'ヤロスラフ・ハシェク': '『兵士シュヴェイクの冒険』作者。風刺的な作品のアイデアを練った場所とされる。',
                        'エグゾ・キッシュ': '著名ジャーナリスト・作家。プラハの文化サロンの中心人物。'
                    },
                    内装と雰囲気: '高い天井、大理石のテーブル、ベルベットの椅子、クリスタルシャンデリアが特徴的。奥にある3台のビリヤード台は1902年から使用されているオリジナル。壁には歴史的写真や絵画が飾られ、タイムスリップしたような空間。',
                    メニューハイライト: {
                        'コーヒー': 'ウィーン式コーヒー各種€2.5-4.5。メランジュ、アインシュペナーなど本格的。朝食セット€8-12。',
                        'チェコ料理': 'グラーシュ€8.5、シュニッツェル€12.5、クネドリーキ€6など伝統料理。ランチタイムは地元ビジネスマンで賑わう。',
                        'デザート': 'ザッハトルテ€4.5、アップルシュトゥルーデル€3.8など。チェコ版のケーキも豊富。',
                        'ドリンク': 'チェコビール各種€2.8-3.5。ピルスナー・ウルケル、ブドヴァルなど。ワインセレクションも充実。'
                    },
                    現代の楽しみ方: '平日夕方はビリヤードを楽しむ地元の常連で賑わう。週末は観光客も多いが、早朝（8-10時）なら静かに読書や執筆に集中できる環境。新聞各紙（チェコ語・英語・ドイツ語）も用意。',
                    アクセスと営業: '月-金7:00-23:30、土日9:00-23:30。地下鉄A線ナロードニー・トリーダ駅徒歩1分。国民劇場から徒歩3分。WiFi完備、禁煙。',
                    文化的価値: 'プラハの「リビングヒストリー」として、地元市民にとって単なる観光地ではなく日常の一部。知的遺産を継承する貴重な文化空間として、プラハ市からも保護されている。'
                }
            },
            'imperial': {
                icon: 'fas fa-crown',
                color: '#d4af37',
                title: 'カフェ・インペリアル',
                description: '皇帝の名を冠する格式高いカフェ',
                type: 'cafe',
                image: 'images/prague/cafes/cafe-imperial.jpg',
                details: {
                    opened: '1914年開業',
                    style: 'アール・デコの傑作',
                    ceiling: '美しいモザイク天井',
                    highlights: ['豪華内装', 'アールデコ装飾', 'モザイク天井', '朝食メニュー']
                }
            },
            'slavia': {
                icon: 'fas fa-palette',
                color: '#27ae60',
                title: 'カフェ・スラヴィア',
                description: '芸術家が集う伝統カフェ',
                type: 'cafe',
                image: 'images/prague/cafes/cafe-slavia.jpg',
                details: {
                    location: 'ヴルタヴァ川沿い',
                    view: 'プラハ城とカレル橋の絶景',
                    famous: '芸術家・知識人の集いの場',
                    highlights: ['川沿いテラス', 'プラハ城眺望', '芸術的雰囲気', 'チェコビール']
                }
            },
            
            // Prague attractions
            'prague-castle': {
                icon: 'fas fa-fort-awesome',
                color: '#8b4513',
                title: 'プラハ城コンプレックス',
                image: 'images/prague/attractions/prague-castle.jpg',
                shortDesc: '世界最大級の城郭。70,000㎡の「街の中の街」。2日間有効チケット。',
                longDesc: 'プラハ城は世界最大級の城郭として知られ、その広さは70,000㎡に及ぶ「街の中の街」です。現在もチェコ共和国大統領の公邸として使用されています。',
                highlights: ['聖ヴィート大聖堂（930年創建、1929年完成）', 'ミュシャのステンドグラス', '南塔287段からの展望', '旧王宮のヴラディスラフ・ホール', '黄金の小路（カフカ仕事場22番地）', '毎日正午の衛兵交代式'],
                visitTips: ['最低半日、理想的には丸一日確保', 'チケットは2日間有効なので無理せず計画的に', '朝一の訪問で混雑回避', '南塔は体力必要、晴天日推奨'],
                practical: '入場料：250-350 CZK（エリアにより異なる）、営業時間：6:00-22:00（庭園）、9:00-17:00（建物）',
                category: 'historical',
                rating: 5
            },
            
            'charles-bridge': {
                icon: 'fas fa-bridge',
                color: '#2c3e50',
                title: 'カレル橋',
                image: 'images/prague/attractions/charles-bridge.jpg',
                shortDesc: '14世紀建設、全長520m。時間帯で全く異なる表情を見せる「生きた舞台」。',
                longDesc: 'カレル橋は14世紀に建設された全長520mの石橋で、プラハの象徴的存在です。30体の聖人像が並び、時間帯によって全く異なる表情を見せる「生きた舞台」として愛されています。',
                highlights: ['30体の聖人像（17-18世紀バロック彫刻）', '聖ヤン・ネポムツキー像（台座タッチで幸運・再訪）', '両端の橋塔（有料展望スポット）', '夜明け前の霧の中の幻想的シルエット', '日没後のライトアップされたプラハ城'],
                visitTips: ['滞在中に最低2回、異なる時間帯に渡ること推奨', '夕景・夜景撮影は旧市街橋塔がベスト', 'スリ注意、特に混雑時'],
                practical: '旧市街橋塔：190 CZK、マラー・ストラナ橋塔も展望可能',
                category: 'historical',
                rating: 5
            },
            
            'old-town-square': {
                icon: 'fas fa-clock',
                color: '#e74c3c',
                title: '旧市街広場と天文時計',
                image: 'images/prague/attractions/old-town-square.jpg',
                shortDesc: 'プラハ観光の心臓部。ゴシック・バロック建築に囲まれた歴史的中心地。',
                longDesc: '旧市街広場は、プラハ観光の心臓部として機能する歴史的中心地です。ゴシック様式のティーン教会、バロック様式の聖ミクラーシュ教会に囲まれ、中央には1410年制作の天文時計があります。',
                highlights: ['天文時計（プラハのオルロイ）1410年制作', '毎正時のからくりショー（9:00-21:00）', '12使徒の人形が登場する短いパフォーマンス', 'ティーン教会のゴシック様式尖塔', '聖ミクラーシュ教会のバロック様式'],
                visitTips: ['からくりショー観覧後すぐに旧市庁舎塔に登ると待ち時間短縮', '360度パノラマを独占的に楽しめる', 'からくりショー時は混雑でスリ多発、貴重品管理を徹底'],
                practical: '旧市庁舎塔：450 CZK、営業：9:00-22:00（火-日）、11:00-22:00（月）、エレベーター完備',
                category: 'historical',
                rating: 5
            }
        };

        // Create photo-integrated attraction displays
        function createAttractionPlaceholder(placeholder, attractionKey) {
            if (!attractionData[attractionKey]) {
                console.warn(`Attraction data not found for key: ${attractionKey}`);
                return;
            }

            const data = attractionData[attractionKey];
            console.log('Creating placeholder for:', data.title, 'Image path:', data.image);
            
            // Create photo-integrated visual
            placeholder.innerHTML = `
                <div class="attraction-visual clickable" data-attraction="${attractionKey}" style="
                    background: linear-gradient(135deg, ${data.color}15 0%, ${data.color}05 100%);
                    border: 2px solid ${data.color}30;
                    border-radius: 16px;
                    position: relative;
                    overflow: hidden;
                    height: 250px;
                    transition: all 0.3s ease;
                    cursor: pointer;
                ">
                    <img src="${data.image}" alt="${data.title}" style="
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        position: absolute;
                        top: 0;
                        left: 0;
                        z-index: 1;
                    " onerror="console.error('Failed to load image:', this.src); this.style.display='none';" onload="console.log('Image loaded successfully:', this.src); this.nextElementSibling.style.display='none';">
                    
                    <div class="fallback-visual" style="
                        display: flex;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(135deg, ${data.color}20 0%, ${data.color}10 100%);
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        text-align: center;
                        padding: 2rem;
                        position: absolute;
                        top: 0;
                        left: 0;
                        z-index: 1;
                    ">
                        <div class="attraction-icon" style="
                            font-size: 4rem;
                            color: ${data.color};
                            margin-bottom: 1rem;
                            text-shadow: 0 2px 4px rgba(0,0,0,0.1);
                        ">
                            <i class="${data.icon}"></i>
                        </div>
                        <h3 style="
                            color: var(--primary-color);
                            margin: 0.5rem 0;
                            font-size: 1.2rem;
                            font-weight: 600;
                        ">${data.title}</h3>
                    </div>
                    
                    <div class="attraction-overlay" style="
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        background: linear-gradient(transparent, rgba(0,0,0,0.8));
                        color: white;
                        padding: 2rem 1.5rem 1.5rem;
                        z-index: 2;
                    ">
                        <h3 style="
                            margin: 0 0 0.5rem 0;
                            font-size: 1.3rem;
                            font-weight: 600;
                            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
                        ">${data.title}</h3>
                        <p style="
                            margin: 0;
                            font-size: 0.9rem;
                            opacity: 0.9;
                            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
                        ">${data.description}</p>
                    </div>
                    
                    <div class="type-badge" style="
                        position: absolute;
                        top: 1rem;
                        right: 1rem;
                        background: ${data.color};
                        color: white;
                        padding: 0.3rem 0.8rem;
                        border-radius: 20px;
                        font-size: 0.7rem;
                        font-weight: 500;
                        text-transform: uppercase;
                        letter-spacing: 0.5px;
                        z-index: 3;
                        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                    ">${data.type}</div>
                    
                    <div class="click-hint" style="
                        position: absolute;
                        top: 1rem;
                        left: 1rem;
                        background: rgba(255,255,255,0.9);
                        color: #333;
                        padding: 0.3rem 0.8rem;
                        border-radius: 20px;
                        font-size: 0.7rem;
                        font-weight: 500;
                        z-index: 3;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    ">
                        <i class="fas fa-click"></i> クリックで詳細
                    </div>
                </div>
            `;

            // Add hover and click effects
            const visual = placeholder.querySelector('.attraction-visual');
            const clickHint = visual.querySelector('.click-hint');
            
            visual.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) scale(1.02)';
                this.style.boxShadow = `0 15px 30px ${data.color}30`;
                this.style.borderColor = data.color;
                clickHint.style.opacity = '1';
            });

            visual.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'none';
                this.style.borderColor = data.color + '30';
                clickHint.style.opacity = '0';
            });

            // Add click handler for modal
            visual.addEventListener('click', function() {
                showAttractionModal(attractionKey);
            });

            console.log(`Created photo-integrated display for ${attractionKey}`);
        }

        // Function to show attraction details in modal (make global)
        window.showAttractionModal = function(attractionKey) {
            const data = attractionData[attractionKey];
            if (!data) return;

            const modal = document.getElementById('photo-detail-modal');
            const modalTitle = document.getElementById('modal-title');
            const modalType = document.getElementById('modal-type');
            const modalImage = document.getElementById('modal-image');
            const modalDescription = document.getElementById('modal-description');
            const modalDetails = document.getElementById('modal-details');

            modalTitle.textContent = data.title;
            modalType.textContent = data.type;
            modalType.style.background = data.color;
            modalImage.src = data.image;
            modalImage.alt = data.title;
            modalDescription.textContent = data.description;

            // Create detailed information with better formatting
            let detailsHTML = '<div class="modal-details-content">';
            Object.entries(data.details).forEach(([key, value]) => {
                if (typeof value === 'object' && !Array.isArray(value)) {
                    // Nested object (like 見学コース, 庭園見どころ etc.)
                    detailsHTML += `<div class="detail-section">
                        <h5 class="section-title">${key}</h5>
                        <div class="nested-content">`;
                    Object.entries(value).forEach(([subKey, subValue]) => {
                        detailsHTML += `<div class="detail-item">
                            <h6 class="item-title">${subKey}</h6>
                            <p class="item-description">${subValue}</p>
                        </div>`;
                    });
                    detailsHTML += `</div></div>`;
                } else if (Array.isArray(value)) {
                    // Array values
                    detailsHTML += `<div class="detail-section">
                        <h5 class="section-title">${key}</h5>
                        <ul class="detail-list">`;
                    value.forEach(item => {
                        detailsHTML += `<li>${item}</li>`;
                    });
                    detailsHTML += `</ul></div>`;
                } else {
                    // Simple string values
                    detailsHTML += `<div class="detail-section">
                        <h5 class="section-title">${key}</h5>
                        <p class="detail-text">${value}</p>
                    </div>`;
                }
            });
            detailsHTML += '</div>';
            
            // Add styling for the detailed view
            if (!document.getElementById('modal-detail-styles')) {
                const modalDetailStyles = `
                    <style id="modal-detail-styles">
                        .modal-details-content {
                            line-height: 1.6;
                        }
                        
                        .detail-section {
                            margin-bottom: 1.5rem;
                            padding-bottom: 1rem;
                            border-bottom: 1px solid #eee;
                        }
                        
                        .detail-section:last-child {
                            border-bottom: none;
                        }
                        
                        .section-title {
                            color: var(--primary-color);
                            font-size: 1.1rem;
                            font-weight: 600;
                            margin-bottom: 0.8rem;
                            padding-bottom: 0.3rem;
                            border-bottom: 2px solid var(--secondary-color);
                        }
                        
                        .nested-content {
                            margin-left: 1rem;
                        }
                        
                        .detail-item {
                            margin-bottom: 1rem;
                            padding: 0.8rem;
                            background: #f8f9fa;
                            border-radius: 8px;
                            border-left: 3px solid var(--accent-color);
                        }
                        
                        .item-title {
                            color: var(--accent-color);
                            font-size: 0.95rem;
                            font-weight: 600;
                            margin-bottom: 0.4rem;
                        }
                        
                        .item-description {
                            color: var(--text-dark);
                            font-size: 0.9rem;
                            margin: 0;
                        }
                        
                        .detail-text {
                            color: var(--text-dark);
                            font-size: 0.95rem;
                            margin: 0;
                            text-align: justify;
                        }
                        
                        .detail-list {
                            margin: 0;
                            padding-left: 1.2rem;
                        }
                        
                        .detail-list li {
                            color: var(--text-dark);
                            font-size: 0.9rem;
                            margin-bottom: 0.5rem;
                        }
                        
                        .modal-info h4 {
                            color: var(--primary-color);
                            font-size: 1.3rem;
                            margin-bottom: 1rem;
                            text-align: center;
                            padding-bottom: 0.5rem;
                            border-bottom: 2px solid var(--secondary-color);
                        }
                    </style>
                `;
                document.head.insertAdjacentHTML('beforeend', modalDetailStyles);
            }

            modalDetails.innerHTML = detailsHTML;
            modal.style.display = 'flex';
        }

        // Auto-detect attraction cards and add beautiful visuals
        function autoLoadImages() {
            console.log('autoLoadImages function called');
            const attractionCards = document.querySelectorAll('.attraction-card, .cafe-card, .restaurant-card');
            console.log('Found cards:', attractionCards.length);
            
            attractionCards.forEach(card => {
                const cardTitle = card.querySelector('h4');
                if (!cardTitle) return;

                const title = cardTitle.textContent.toLowerCase();
                let attractionKey = null;

                // Map titles to attraction keys
                if (title.includes('シェーンブルン')) attractionKey = 'schonbrunn';
                else if (title.includes('ホーフブルク')) attractionKey = 'hofburg';
                else if (title.includes('ベルヴェデーレ')) attractionKey = 'belvedere';
                else if (title.includes('シュテファン')) attractionKey = 'stephansdom';
                else if (title.includes('美術史美術館')) attractionKey = 'kunsthistorisches';
                else if (title.includes('アルベルティーナ')) attractionKey = 'albertina';
                else if (title.includes('モーツァルト')) attractionKey = 'mozart-house';
                else if (title.includes('国立歌劇場')) attractionKey = 'state-opera';
                else if (title.includes('楽友協会') || title.includes('黄金ホール')) attractionKey = 'philharmonic';
                else if (title.includes('ザッハー')) attractionKey = 'sacher';
                else if (title.includes('デメル')) attractionKey = 'demel';
                else if (title.includes('プラハ城')) attractionKey = 'prague-castle';
                else if (title.includes('カレル橋')) attractionKey = 'charles-bridge';
                else if (title.includes('旧市街広場')) attractionKey = 'old-town-square';
                else if (title.includes('ティーン教会')) attractionKey = 'tyn-church';
                else if (title.includes('聖ヴィート')) attractionKey = 'vitus-cathedral';
                else if (title.includes('ルーヴル')) attractionKey = 'louvre';
                else if (title.includes('インペリアル')) attractionKey = 'imperial';
                else if (title.includes('スラヴィア')) attractionKey = 'slavia';

                if (attractionKey) {
                    console.log('Processing attraction:', attractionKey, 'for card:', cardTitle.textContent);
                    
                    // Create visual placeholder
                    const placeholder = document.createElement('div');
                    placeholder.className = 'attraction-placeholder';

                    // Insert placeholder at the beginning of card content
                    const cardContent = card.querySelector('.card-content');
                    if (cardContent) {
                        cardContent.insertBefore(placeholder, cardContent.firstChild);
                        
                        // Create beautiful placeholder with a slight delay for animation effect
                        setTimeout(() => {
                            createAttractionPlaceholder(placeholder, attractionKey);
                        }, Math.random() * 500 + 200);
                    }
                } else {
                    console.log('No attraction key found for:', cardTitle.textContent);
                }
            });
        }

        // Create modal system
        createPhotoDetailModal();
        
        // Initialize visual placeholders after DOM is ready
        setTimeout(autoLoadImages, 1000);

        // Manual placeholder creator function for custom usage
        window.loadCustomAttraction = function(containerId, attractionKey) {
            const container = document.getElementById(containerId);
            if (!container || !attractionData[attractionKey]) return false;

            const placeholder = document.createElement('div');
            placeholder.className = 'attraction-placeholder';

            container.appendChild(placeholder);
            createAttractionPlaceholder(placeholder, attractionKey);
            return true;
        };

        console.log('Attraction visual management initialized');
    }

    initializeAttractionImages();

    console.log('Central European Travel Guide website initialized successfully!');
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error occurred:', e.error);
});

// Service Worker registration (for future PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // navigator.registerServiceWorker('/sw.js')
        // .then(function(registration) {
        //     console.log('SW registered: ', registration);
        // })
        // .catch(function(registrationError) {
        //     console.log('SW registration failed: ', registrationError);
        // });
    });
}
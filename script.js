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
                    概要: 'ウィーン市街から約6km南西、1696年に建設が開始されたバロック様式の離宮。マリア・テレジア女帝時代に現在の姿に拡張され、ハプスブルク家の夏の居住地として使用された。現在はユネスコ世界遺産に登録され、年間約400万人が訪れる。',
                    建築規模: '宮殿本体1,441室、敷地面積160ヘクタールという巨大な複合施設。正面幅180m、奥行120mの本館に加え、バロック式庭園、グロリエッテ、世界最古の動物園を含む。',
                    見学コース: {
                        'インペリアルツアー': '22室見学・約60分・€16.40。フランツ・ヨーゼフ皇帝とエリーザベト皇后の私室を中心とした基本コース。',
                        'グランドツアー': '40室見学・約90分・€20.40。マリア・テレジアの大広間や鏡の間を含む充実コース。初回訪問者におすすめ。',
                        'シシィ・チケット': '€44.00で1年間有効、時間指定不要。ホーフブルク王宮との共通券として最も柔軟性が高い。'
                    },
                    庭園見どころ: {
                        'バロック式庭園': '幾何学的に設計された美しい庭園。季節の花々と彫刻が調和した芸術作品。',
                        'グロリエッテ': '丘の上の凱旋門風建造物。内部カフェと展望台からウィーン市街の絶景を一望。',
                        'ネプチューンの噴水': '海神ネプチューンを中心とした壮大な噴水。夏期の噴水ショーは必見。',
                        '迷路庭園': '1720年代に造られた生垣の迷路。家族連れに人気のアトラクション。'
                    },
                    訪問戦略: '最低半日、理想的には丸一日を確保。朝一番（8:30開館）に入場し、グランドツアー → 庭園散策 → グロリエッテ → 動物園の順序が効率的。シシィ・チケットなら時間に縛られず、複数回訪問も可能。',
                    料金情報: '宮殿単体€16.40-20.40、庭園込み€26.40-30.40、年間パス€53。オンライン購入で€2-3割引。グロリエッテ展望台は別途€4.50。',
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
                    概要: 'ウィーン市内中心部に位置する、240,000平方メートルの巨大な宮殿複合体。13世紀から20世紀まで歴代皇帝の居住地として使用され、現在はオーストリア大統領官邸としても機能している。18の建物群、19の中庭、2,600室からなる「帝国の心臓部」。',
                    主要施設: {
                        '皇帝の部屋': 'フランツ・ヨーゼフ皇帝とエリーザベト皇后の私的居住空間。19世紀の宮廷生活を垣間見ることができる。皇帝の質素な書斎と皇后の豪華な化粧室の対比が印象的。',
                        'シシィ博物館': '美貌の皇后エリーザベト（シシィ）の生涯を展示。暗殺時の血染めの衣服、美容への執着を示す体重計、詩作品など、神話化された皇后の実像に迫る。',
                        '王宮宝物館': '神聖ローマ帝国皇帝の帝冠、オーストリア帝国の帝冠など、1000年の帝国史を物語る至宝を展示。世界で最も価値ある宝物コレクションの一つ。',
                        'スペイン乗馬学校': '450年の伝統を誇る古典馬術の殿堂。リピッツァナー種の白馬による優雅な演技は「生きた芸術」として世界的に有名。'
                    },
                    国立図書館: '世界で最も美しい図書館の一つ「プルンクザール」。バロック建築の傑作で、フレスコ画に囲まれた20万冊の蔵書は圧巻。カール6世の図書館として1726年完成。',
                    見学戦略: 'シシィ・チケット（€44）が最も効率的。皇帝の部屋・シシィ博物館・王宮宝物館を1年間有効で見学可能。興味に応じて施設を選択し、最低3-4時間は確保したい。',
                    隠れた見どころ: {
                        'ヘルデンプラッツ': '英雄広場。ナポレオン戦争の英雄オイゲン公とカール大公の騎馬像。ヒトラーの演説場所としても歴史的意味を持つ。',
                        'ミヒャエル門': '帝国時代の正門。考古学遺跡と現代建築が共存する独特な空間。',
                        'ブルク庭園': '皇宮庭園。モーツァルト記念碑があり、市民の憩いの場として親しまれている。'
                    },
                    料金とアクセス: '各施設€12-15、シシィ・チケット€44が最もお得。地下鉄U3線ヘレンガッセ駅徒歩3分。リンク通り沿いで市内観光の起点として最適。'
                }
            },
            'belvedere': {
                icon: 'fas fa-seedling',
                color: '#27ae60',
                title: 'ベルヴェデーレ宮殿',
                description: 'バロック様式の美しい宮殿',
                type: 'palace',
                image: 'images/vienna/attractions/belvedere-palace.jpg',
                details: {
                    architect: 'ヨハン・ルーカス・フォン・ヒルデブラント',
                    built: '1714-1723年建設',
                    famous: 'クリムトの「接吻」を所蔵',
                    highlights: ['上宮', '下宮', 'バロック庭園', 'クリムトコレクション']
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
                description: '世界屈指の美術コレクション',
                type: 'museum',
                image: 'images/vienna/museums/kunsthistorisches-museum.jpg',
                details: {
                    collection: '70万点以上の美術品',
                    famous: 'ブリューゲル世界最大コレクション',
                    masterpiece: 'フェルメール「絵画芸術」',
                    highlights: ['絵画ギャラリー', 'クンストカンマー', '古代コレクション', 'コイン・コレクション']
                }
            },
            // Prague attractions
            'prague-castle': {
                icon: 'fas fa-chess-rook',
                color: '#e67e22',
                title: 'プラハ城',
                description: '9世紀から現在まで1000年以上の歴史を持つ、世界最大級の古城複合体',
                type: 'castle',
                image: 'images/prague/attractions/prague-castle.jpg',
                details: {
                    概要: '約7万平方メートルの敷地に宮殿、教会、庭園が点在する巨大な城塞都市。9世紀にボヘミア公により建設が開始され、神聖ローマ帝国皇帝、ボヘミア王、チェコスロバキア大統領、そして現在のチェコ共和国大統領の居住地として1000年以上機能し続けている。ギネスブック認定の「世界最大の古城」。',
                    聖ヴィート大聖堂: 'プラハ城の中心的建造物。1344年建設開始、1929年完成のゴシック建築の最高傑作。高さ96.6mの尖塔はプラハのシンボル。ミュシャ作のステンドグラス、聖ヤン・ネポムツキーの銀の廟、歴代ボヘミア王の墓所が見どころ。王冠宝物庫も併設。',
                    旧王宮: 'ボヘミア王の居住地として使用された宮殿。特に「ヴラディスラフ・ホール」は中世ヨーロッパ最大の世俗ホールで、馬上槍試合も行われた。1618年の「プラハ窓外投擲事件」の現場でもあり、三十年戦争の発端となった歴史的意義を持つ。',
                    黄金小路: '16世紀に城の守衛や職人が住んだカラフルな小さな家々が並ぶ通り。錬金術師が住んだという伝説から「黄金小路」と呼ばれる。作家フランツ・カフカが1916-1917年に22番地に住んでいたことでも有名。現在は土産物店や展示室として利用。',
                    聖イジー教会: 'プラハ城内で最も古い教会（973年創建）。ロマネスク様式の傑作で、ボヘミア最初の修道院でもあった。赤いバロック・ファサードと対照的な質素な内部、歴代プシェミスル朝君主の墓所が印象的。',
                    見学戦略: 'チケットABC（€12-17）で主要施設見学可能。朝9時開門と同時に入場すれば混雑回避。聖ヴィート大聖堂 → 旧王宮 → 聖イジー教会 → 黄金小路の順序が効率的。所要時間3-4時間。',
                    撮影スポット: {
                        '城内から市街眺望': '第三の中庭から旧市街とカレル橋の絶景',
                        '南庭園': 'バロック庭園とプラハ市街のパノラマ',
                        '王宮庭園': '春夏限定公開の美しい庭園（€10追加）'
                    },
                    アクセスと料金: 'トラム22番プラハ城駅下車すぐ。チケットA（大聖堂・旧王宮・聖イジー教会）€12、チケットB（上記+黄金小路・火薬塔）€17。音声ガイド€4追加推奨。'
                }
            },
            'charles-bridge': {
                icon: 'fas fa-bridge-circle-check',
                color: '#2c3e50',
                title: 'カレル橋',
                description: '1357年建設開始、プラハ最古にして最も美しい石橋。30体の聖人像が並ぶ「屋外美術館」',
                type: 'bridge',
                image: 'images/prague/attractions/charles-bridge.jpg',
                details: {
                    概要: '全長516m、幅約10mの石造アーチ橋。神聖ローマ皇帝カレル4世の命により1357年7月9日5:31に建設開始（数字の並びが美しいとして選ばれた時刻）。約50年の歳月をかけて完成し、19世紀まで唯一のヴルタヴァ川架橋として旧市街とマラー・ストラナを結んだ。',
                    聖人像群: '橋の欄干に並ぶ30体のバロック彫刻群（現在はすべてレプリカ、オリジナルは国立博物館保管）。最も有名な聖ヤン・ネポムツキー像（1683年制作）は、台座のブロンズ・レリーフに触れると幸運が訪れるとされ、多くの観光客が列を作る。',
                    橋塔群: {
                        '旧市街橋塔': '高さ47mのゴシック様式塔。1380年完成、ペトル・パルレーシュ設計。内部は博物館で、最上階からの眺望は絶景。入場料€5。',
                        'マラー・ストラナ橋塔': '2つの塔で構成。高い方（1464年完成）からの城側眺望も素晴らしい。入場料€5。'
                    },
                    最適撮影時間: {
                        '朝焼け': '6:00-7:00。観光客が少なく、朝霧とゴールデンライトが幻想的。特に秋冬がベスト。',
                        '夕景': '19:00-20:00（夏期）。プラハ城がライトアップされ、橋も温かい光に包まれる。',
                        'ブルーアワー': '日没後30分。空の青と街灯のオレンジのコントラストが美しい。'
                    },
                    歴史の舞台: '1621年、白山の戦いで敗れたプロテスタント貴族27人の首が橋塔に晒された。1648年にはスウェーデン軍の侵攻をプラハ市民が阻止した「カレル橋の戦い」の舞台。現在も数多くの映画のロケ地として使用される。',
                    路上アーティスト: '日中は画家、音楽家、人形劇師などが芸を披露。特に「プラハの春」音楽祭期間中（5-6月）は質の高い演奏が楽しめる。投げ銭文化なので気に入ったら小額を。',
                    混雑回避法: '早朝6-8時、夜21時以降が狙い目。日中（10-18時）は非常に混雑。雨の日は観光客が減り、濡れた石畳が美しい反射を作る穴場タイム。',
                    周辺スポット: 'カンパ島（橋の下の中州、現代アート展示）、レノン・ウォール（平和のメッセージが描かれた壁）、ヴルタヴァ川クルーズ乗り場まで徒歩圏内。'
                }
            },
            'old-town-square': {
                icon: 'fas fa-clock',
                color: '#f39c12',
                title: '旧市街広場',
                description: '天文時計で有名な広場',
                type: 'square',
                image: 'images/prague/attractions/old-town-square.jpg',
                details: {
                    history: '12世紀から商業の中心地',
                    famous: '天文時計の毎時パフォーマンス',
                    buildings: 'ティーン教会、聖ニコライ教会',
                    highlights: ['天文時計', 'ティーン教会', '旧市庁舎', 'ヤン・フス記念碑']
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
                description: '世界最高峰のオペラハウス',
                type: 'theater',
                image: 'images/vienna/music/vienna-state-opera.jpg',
                details: {
                    opened: '1869年開場',
                    capacity: '約2,280席',
                    season: '9月-6月（年間約300公演）',
                    highlights: ['立ち見席（€4-）', 'ガイドツアー', '豪華内装', 'ウィーン・フィル本拠地']
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

        // Function to show attraction details in modal
        function showAttractionModal(attractionKey) {
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
const scrollIndicator = document.getElementById("scrollIndicator");
let ticking = false;

function calculateScrollMetrics() {
    const docHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
    );
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const totalScrollHeight = docHeight - windowHeight;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    let percentage = 0;
    if (totalScrollHeight > 0) {
        percentage = (scrollY / totalScrollHeight) * 100;
    }
    return Math.min(100, Math.max(0, percentage));
}

function updateScrollIndicator() {
    const scrollPercentage = calculateScrollMetrics();
    
    if (scrollIndicator) {
        scrollIndicator.style.width = scrollPercentage + "%";
    }

    const percentageText = document.getElementById("percentageText");
    if (percentageText) {
        percentageText.textContent = Math.round(scrollPercentage) + "%";
    }

    const quickPills = document.querySelectorAll(".nav-pill");
    if (quickPills.length > 0) {
        const sections = document.querySelectorAll(".text h2");
        let activeIndex = 0;
        sections.forEach((sec, idx) => {
            const rect = sec.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.4) {
                activeIndex = idx;
            }
        });
        quickPills.forEach((pill, idx) => {
            if (idx === activeIndex) {
                pill.classList.add("active");
            } else {
                pill.classList.remove("active");
            }
        });
    }
}

function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateScrollIndicator();
            ticking = false;
        });
        ticking = true;
    }
}

function scrollToLetter(letter) {
    const target = document.getElementById("letter-" + letter);
    if (target) {
        const headerOffset = 140;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
        });
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll);

document.addEventListener("DOMContentLoaded", () => {
    updateScrollIndicator();

    const topBtn = document.getElementById("scrollTopBtn");
    if (topBtn) topBtn.addEventListener("click", scrollToTop);

    const btmBtn = document.getElementById("scrollBottomBtn");
    if (btmBtn) btmBtn.addEventListener("click", scrollToBottom);

    const navPills = document.querySelectorAll(".nav-pill");
    navPills.forEach(pill => {
        pill.addEventListener("click", () => {
            const letter = pill.dataset.letter;
            if (letter) scrollToLetter(letter);
        });
    });
});

updateScrollIndicator();

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        calculateScrollMetrics,
        updateScrollIndicator
    };
}


// MOBILE NAVIGATION

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});

// INTERNSHIP DATA

const internships = [
    {
        id: 1,
        icon: "💻",
        title: "Frontend Developer Intern",
        company: "TechNova Solutions",
        category: "Web Development",
        location: "Remote",
        duration: "3 Months",
        stipend: "₹8,000/month",
        description: "Develop responsive websites using HTML, CSS and JavaScript.",
        skills: "HTML, CSS, JavaScript"
    },
    {
        id: 2,
        icon: "📊",
        title: "Data Analyst Intern",
        company: "DataSphere",
        category: "Data Science",
        location: "Hyderabad",
        duration: "4 Months",
        stipend: "₹10,000/month",
        description: "Analyze datasets and create dashboards and data reports.",
        skills: "Python, SQL, Excel"
    },
    {
        id: 3,
        icon: "🤖",
        title: "AI/ML Intern",
        company: "FutureAI Labs",
        category: "AI/ML",
        location: "Remote",
        duration: "3 Months",
        stipend: "₹12,000/month",
        description: "Work on machine learning models and AI-based projects.",
        skills: "Python, Machine Learning"
    },
    {
        id: 4,
        icon: "🔐",
        title: "Cybersecurity Intern",
        company: "SecureNet",
        category: "Cybersecurity",
        location: "Hybrid",
        duration: "2 Months",
        stipend: "₹7,000/month",
        description: "Learn security monitoring and cybersecurity fundamentals.",
        skills: "Networking, Linux, Security"
    },
    {
        id: 5,
        icon: "🎨",
        title: "UI/UX Design Intern",
        company: "CreativePixel",
        category: "UI/UX Design",
        location: "Remote",
        duration: "3 Months",
        stipend: "₹6,000/month",
        description: "Design user-friendly interfaces and interactive prototypes.",
        skills: "Figma, UI Design"
    },
    {
        id: 6,
        icon: "🌐",
        title: "Full Stack Developer Intern",
        company: "CodeCraft",
        category: "Web Development",
        location: "Hyderabad",
        duration: "6 Months",
        stipend: "₹15,000/month",
        description: "Build frontend and backend web application features.",
        skills: "HTML, CSS, JavaScript, Node.js"
    },
    {
        id: 7,
        icon: "📈",
        title: "Data Science Intern",
        company: "InsightWorks",
        category: "Data Science",
        location: "Remote",
        duration: "3 Months",
        stipend: "₹9,000/month",
        description: "Explore data analysis, visualization and predictive modeling.",
        skills: "Python, Pandas, Statistics"
    },
    {
        id: 8,
        icon: "🧠",
        title: "Machine Learning Intern",
        company: "NeuralEdge",
        category: "AI/ML",
        location: "Hybrid",
        duration: "4 Months",
        stipend: "₹12,000/month",
        description: "Assist in developing and testing machine learning solutions.",
        skills: "Python, ML, NumPy"
    },
    {
        id: 9,
        icon: "🖌️",
        title: "Product Design Intern",
        company: "DesignSpace",
        category: "UI/UX Design",
        location: "Remote",
        duration: "2 Months",
        stipend: "₹5,000/month",
        description: "Create wireframes, visual designs and prototypes.",
        skills: "Figma, Prototyping"
    }
];

// HTML ESCAPING

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entities[character];
    });
}

// APPLICATION STORAGE

function loadApplications() {
    try {
        const stored = JSON.parse(
            localStorage.getItem("internHubApplications") || "[]"
        );

        return Array.isArray(stored) ? stored : [];
    } catch (error) {
        return [];
    }
}

let applications = loadApplications();

// DOM ELEMENTS

const internshipGrid = document.getElementById("internshipGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const applicationList = document.getElementById("applicationList");
const applicationEmpty = document.getElementById("applicationEmpty");
const emptyMessage = document.getElementById("emptyMessage");

const modal = document.getElementById("applicationModal");
const closeModal = document.getElementById("closeModal");
const applicationForm = document.getElementById("applicationForm");
const modalInternshipTitle = document.getElementById("modalInternshipTitle");
const selectedInternshipId = document.getElementById("selectedInternshipId");
const formMessage = document.getElementById("formMessage");

// DISPLAY INTERNSHIPS

function displayInternships() {
    const searchText = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;

    const filteredInternships = internships.filter(internship => {
        const matchesSearch =
            internship.title.toLowerCase().includes(searchText) ||
            internship.company.toLowerCase().includes(searchText) ||
            internship.category.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "All" ||
            internship.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    internshipGrid.innerHTML = "";

    emptyMessage.textContent = filteredInternships.length === 0
        ? "No internships found. Try another search."
        : "";

    filteredInternships.forEach(internship => {
        const alreadyApplied = applications.some(
            application => application.internshipId === internship.id
        );

        const card = document.createElement("div");
        card.className = "internship-card";

        card.innerHTML = `
            <div class="company-icon">${internship.icon}</div>

            <h3>${escapeHTML(internship.title)}</h3>

            <p class="company-name">
                ${escapeHTML(internship.company)}
            </p>

            <span class="category-tag">
                ${escapeHTML(internship.category)}
            </span>

            <div class="internship-details">
                📍 ${escapeHTML(internship.location)}<br>
                ⏳ ${escapeHTML(internship.duration)}<br>
                💰 ${escapeHTML(internship.stipend)}
            </div>

            <p class="internship-description">
                ${escapeHTML(internship.description)}
            </p>

            <p class="internship-details">
                <strong>Skills:</strong> ${escapeHTML(internship.skills)}
            </p>

            <button class="btn apply-btn"
                data-id="${internship.id}"
                ${alreadyApplied ? "disabled" : ""}>
                ${alreadyApplied ? "Already Applied" : "Apply Now"}
            </button>
        `;

        internshipGrid.appendChild(card);
    });
}

// OPEN APPLICATION MODAL

function openApplicationModal(internshipId) {
    const internship = internships.find(
        item => item.id === internshipId
    );

    if (!internship) return;

    const alreadyApplied = applications.some(
        application => application.internshipId === internshipId
    );

    if (alreadyApplied) return;

    modalInternshipTitle.textContent =
        internship.title + " – " + internship.company;

    selectedInternshipId.value = internshipId;
    formMessage.textContent = "";

    applicationForm.reset();
    selectedInternshipId.value = internshipId;

    modal.classList.add("active");
}

// CLOSE MODAL

function hideModal() {
    modal.classList.remove("active");
    applicationForm.reset();
    formMessage.textContent = "";
}

closeModal.addEventListener("click", hideModal);

modal.addEventListener("click", event => {
    if (event.target === modal) {
        hideModal();
    }
});

// APPLY BUTTON CLICK

internshipGrid.addEventListener("click", event => {
    const button = event.target.closest(".apply-btn");

    if (!button || button.disabled) return;

    const internshipId = Number(button.dataset.id);

    openApplicationModal(internshipId);
});

// SUBMIT APPLICATION

applicationForm.addEventListener("submit", event => {
    event.preventDefault();

    const internshipId = Number(selectedInternshipId.value);

    const internship = internships.find(
        item => item.id === internshipId
    );

    if (!internship) {
        formMessage.textContent = "Internship not found.";
        return;
    }

    const alreadyApplied = applications.some(
        application => application.internshipId === internshipId
    );

    if (alreadyApplied) {
        formMessage.textContent =
            "You have already applied for this internship.";
        return;
    }

    const studentName = document.getElementById("studentName")
        .value.trim();

    const studentEmail = document.getElementById("studentEmail")
        .value.trim();

    const studentCollege = document.getElementById("studentCollege")
        .value.trim();

    const studentSkills = document.getElementById("studentSkills")
        .value.trim();

    const studentReason = document.getElementById("studentReason")
        .value.trim();

    if (
        !studentName ||
        !studentEmail ||
        !studentCollege ||
        !studentSkills ||
        !studentReason
    ) {
        formMessage.textContent = "Please fill in all fields.";
        return;
    }

    const newApplication = {
        applicationId: Date.now(),
        internshipId: internship.id,
        title: internship.title,
        company: internship.company,
        name: studentName,
        email: studentEmail,
        college: studentCollege,
        skills: studentSkills,
        reason: studentReason,
        date: new Date().toLocaleDateString(),
        status: "Pending"
    };

    applications.push(newApplication);

    if (!saveApplications()) {
        applications.pop();
        formMessage.textContent =
            "Could not save application. Please try again.";
        return;
    }

    hideModal();

    displayInternships();
    displayApplications();
    updateStats();

    alert("Application submitted successfully!");
});

// SAVE APPLICATIONS

function saveApplications() {
    try {
        localStorage.setItem(
            "internHubApplications",
            JSON.stringify(applications)
        );

        return true;
    } catch (error) {
        return false;
    }
}

// DISPLAY APPLICATIONS

function displayApplications() {
    applicationList.innerHTML = "";

    applicationEmpty.style.display =
        applications.length === 0 ? "block" : "none";

    applications.forEach(application => {
        const card = document.createElement("div");
        card.className = "application-card";

        card.innerHTML = `
            <div>
                <h3>${escapeHTML(application.title)}</h3>

                <p>
                    <strong>Company:</strong>
                    ${escapeHTML(application.company)}
                </p>

                <p>
                    <strong>Applicant:</strong>
                    ${escapeHTML(application.name)}
                </p>

                <p>
                    <strong>College:</strong>
                    ${escapeHTML(application.college)}
                </p>

                <p>
                    <strong>Applied on:</strong>
                    ${escapeHTML(application.date)}
                </p>

                <p>
                    <strong>Status:</strong>
                    <span class="status">
                        ${escapeHTML(application.status)}
                    </span>
                </p>
            </div>

            <button class="cancel-btn"
                data-id="${application.applicationId}">
                Cancel Application
            </button>
        `;

        applicationList.appendChild(card);
    });
}

// CANCEL APPLICATION

applicationList.addEventListener("click", event => {
    const button = event.target.closest(".cancel-btn");

    if (!button) return;

    const applicationId = Number(button.dataset.id);

    const confirmed = confirm(
        "Are you sure you want to cancel this application?"
    );

    if (!confirmed) return;

    const previousApplications = applications;

    applications = applications.filter(
        application => application.applicationId !== applicationId
    );

    if (!saveApplications()) {
        applications = previousApplications;
        alert("Could not update applications. Please try again.");
        return;
    }

    displayApplications();
    displayInternships();
    updateStats();
});

// UPDATE STATISTICS

function updateStats() {
    document.getElementById("totalInternships").textContent =
        internships.length;

    document.getElementById("totalApplications").textContent =
        applications.length;

    document.getElementById("activeApplications").textContent =
        applications.filter(application =>
            application.status === "Pending" ||
            application.status === "Under Review"
        ).length;
}

// SEARCH

searchInput.addEventListener("input", displayInternships);

// FILTER

categoryFilter.addEventListener("change", displayInternships);

// INITIALIZE

displayInternships();
displayApplications();
updateStats();

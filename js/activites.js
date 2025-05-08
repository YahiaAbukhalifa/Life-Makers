// Activities data
const activitiesData = [
    {
        id: 1,
        name: "قافلة لنعمر",
        description: `لنعمّر ونمضي ويبقى الأثر ✨ 💙 

بخطى ثابتة وقلبٍ واثق وسعي دؤوب، وبفضل الله ثم دعمكم لينا، حققنا هدفنا في قافلة لنعمر 6، ووصلنا الدفا وأسعدنا أهالينا المستحقين في أكثر من مكان داخل : 
🔸️ قرية المأمورية 
🔸️ قرية الفؤادية 

  من خلال قافلة لنعمر 6 واللي فيها قام متطوعونا الأبطال رغم المطر والبرد وصعوبة الطريق بتوصيل بعض احتياجات الأسر المستحقة لهم داخل بيوتهم لمساعدتهم والتسهيل عليهم وإدخال السرور على قلوبهم من خلال توزيع : 

🔸️٢٠٠ وجبة إطعام 
🔸️ ٧٠ بطانية 
🔸️٨٠ كيلو عدس

شكرًا لفرق التوزيع ولكل متطوع ساهم بوقته وجهده لمساعدة غيره ووصّل الدفا والأمان لأسر كتير .`,
        image: "./images/activities-cover-1.jfif"
    },
    {
        id: 2,
        name: "قافلة لنعمر",
        description: `لنعمّر ونمضي ويبقى الأثر ✨ 💙 

بخطى ثابتة وقلبٍ واثق وسعي دؤوب، وبفضل الله ثم دعمكم لينا، حققنا هدفنا في قافلة لنعمر 6، ووصلنا الدفا وأسعدنا أهالينا المستحقين في أكثر من مكان داخل : 
🔸️ قرية المأمورية 
🔸️ قرية الفؤادية 

  من خلال قافلة لنعمر 6 واللي فيها قام متطوعونا الأبطال رغم المطر والبرد وصعوبة الطريق بتوصيل بعض احتياجات الأسر المستحقة لهم داخل بيوتهم لمساعدتهم والتسهيل عليهم وإدخال السرور على قلوبهم من خلال توزيع : 

🔸️٢٠٠ وجبة إطعام 
🔸️ ٧٠ بطانية 
🔸️٨٠ كيلو عدس

شكرًا لفرق التوزيع ولكل متطوع ساهم بوقته وجهده لمساعدة غيره ووصّل الدفا والأمان لأسر كتير .`,
        image: "./images/activities-cover-1.jfif"
    },
    {
        id: 3,
        name: "قافلة لنعمر",
        description: `لنعمّر ونمضي ويبقى الأثر ✨ 💙 

بخطى ثابتة وقلبٍ واثق وسعي دؤوب، وبفضل الله ثم دعمكم لينا، حققنا هدفنا في قافلة لنعمر 6، ووصلنا الدفا وأسعدنا أهالينا المستحقين في أكثر من مكان داخل : 
🔸️ قرية المأمورية 
🔸️ قرية الفؤادية 

  من خلال قافلة لنعمر 6 واللي فيها قام متطوعونا الأبطال رغم المطر والبرد وصعوبة الطريق بتوصيل بعض احتياجات الأسر المستحقة لهم داخل بيوتهم لمساعدتهم والتسهيل عليهم وإدخال السرور على قلوبهم من خلال توزيع : 

🔸️٢٠٠ وجبة إطعام 
🔸️ ٧٠ بطانية 
🔸️٨٠ كيلو عدس

شكرًا لفرق التوزيع ولكل متطوع ساهم بوقته وجهده لمساعدة غيره ووصّل الدفا والأمان لأسر كتير .`,
        image: "./images/activities-cover-1.jfif"
    },
    {
        id: 4,
        name: "قافلة لنعمر",
        description: `لنعمّر ونمضي ويبقى الأثر ✨ 💙 

بخطى ثابتة وقلبٍ واثق وسعي دؤوب، وبفضل الله ثم دعمكم لينا، حققنا هدفنا في قافلة لنعمر 6، ووصلنا الدفا وأسعدنا أهالينا المستحقين في أكثر من مكان داخل : 
🔸️ قرية المأمورية 
🔸️ قرية الفؤادية 

  من خلال قافلة لنعمر 6 واللي فيها قام متطوعونا الأبطال رغم المطر والبرد وصعوبة الطريق بتوصيل بعض احتياجات الأسر المستحقة لهم داخل بيوتهم لمساعدتهم والتسهيل عليهم وإدخال السرور على قلوبهم من خلال توزيع : 

🔸️٢٠٠ وجبة إطعام 
🔸️ ٧٠ بطانية 
🔸️٨٠ كيلو عدس

شكرًا لفرق التوزيع ولكل متطوع ساهم بوقته وجهده لمساعدة غيره ووصّل الدفا والأمان لأسر كتير .`,
        image: "./images/activities-cover-1.jfif"
    }
];

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function () {
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const activityId = urlParams.get('id');

    // Get the activities section
    const activitiesSection = document.querySelector('.activites');

    // If there's an activity ID in the URL, show the details page
    if (activityId) {
        showActivityDetails(activityId);
    } else {
        // Otherwise, show the list of activities
        renderActivitiesList();
    }

    // Function to render the list of activities
    function renderActivitiesList() {
        // Create a container for the activities cards
        const activitiesContainer = document.createElement('div');
        activitiesContainer.className = 'activities-container';

        // Loop through the activities data and create a card for each
        activitiesData.forEach(activity => {
            // Create the activity card
            const activityCard = document.createElement('div');
            activityCard.className = 'activity-card';

            // Create the card content
            activityCard.innerHTML = `
                <div class="activity-image">
                    <img src="${activity.image}" alt="${activity.name}">
                </div>
                <div class="activity-info">
                    <h3>${activity.name}</h3>
                    <a href="activites.html?id=${activity.id}" class="more-info-btn">مزيد من المعلومات</a>
                </div>
            `;

            // Add the card to the container
            activitiesContainer.appendChild(activityCard);
        });

        // Add the container to the activities section
        activitiesSection.appendChild(activitiesContainer);

        // Add CSS for the activities list page
        addActivitiesListStyles();
    }

    // Function to show the details of a specific activity
    function showActivityDetails(id) {
        // Find the activity with the matching ID
        const activity = activitiesData.find(act => act.id === parseInt(id));

        // If the activity exists, show its details
        if (activity) {
            // Update the page title
            document.title = `صناع الحياة دمياط | ${activity.name}`;

            // Create the details container
            const detailsContainer = document.createElement('div');
            detailsContainer.className = 'activity-details';

            // Create the details content
            detailsContainer.innerHTML = `
                <div class="activity-details-image">
                    <img src="${activity.image}" alt="${activity.name}">
                </div>
                <div class="activity-details-content">
                    <h3>${activity.name}</h3>
                    <div class="activity-description">${activity.description.replace(/\n/g, '<br>')}</div>
                    <div class="activity-gallery">
                        <img src="./images/activities-1.jpg" alt="Activity Image 1">
                        <img src="./images/activities-2.jpg" alt="Activity Image 2">
                        <img src="./images/activities-3.jpg" alt="Activity Image 3">
                        <img src="./images/activities-4.jpg" alt="Activity Image 4">
                    </div>
                    <a href="activites.html" class="back-btn">العودة للأنشطة</a>
                </div>
            `;

            // Add the details to the activities section
            activitiesSection.appendChild(detailsContainer);

            // Add CSS for the details page
            addActivityDetailsStyles();
        } else {
            // If the activity doesn't exist, show an error message
            activitiesSection.innerHTML += `
                <div class="error-message">
                    <p>عفواً، لم يتم العثور على النشاط المطلوب.</p>
                    <a href="activites.html" class="back-btn">العودة للأنشطة</a>
                </div>
            `;
        }
    }

    // Function to add CSS for the activities list page
    function addActivitiesListStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .activities-container {
                display: flex;
                flex-wrap: wrap;
                justify-content: center;
                gap: 30px;
                padding: 20px;
                max-width: 1200px;
                margin: 0 auto;
            }

            .activity-card {
                width: 350px;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                background-color: white;
            }

            .activity-card:hover {
                transform: translateY(-10px);
                box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
            }

            .activity-image {
                height: 200px;
                overflow: hidden;
            }

            .activity-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform 0.5s ease;
            }

            .activity-card:hover .activity-image img {
                transform: scale(1.1);
            }

            .activity-info {
                padding: 20px;
                text-align: center;
            }

            .activity-info h3 {
                margin: 0 0 15px;
                font-size: 22px;
                color: var(--secondary-color);
            }

            .more-info-btn {
                display: inline-block;
                padding: 10px 20px;
                background-color: var(--secondary-color);
                color: white;
                border-radius: 5px;
                text-decoration: none;
                font-weight: bold;
                transition: background-color 0.3s ease;
            }

            .more-info-btn:hover {
                background-color: var(--secondary-color-gradiant);
            }

            @media (max-width: 768px) {
                .activities-container {
                    padding: 10px;
                }

                .activity-card {
                    width: 100%;
                    max-width: 400px;
                }
            }
        `;
        document.head.appendChild(styleElement);
    }

    // Function to add CSS for the activity details page
    function addActivityDetailsStyles() {
        const styleElement = document.createElement('style');
        styleElement.textContent = `
            .activity-details {
                max-width: 1000px;
                margin: 0 auto;
                padding: 20px;
                background-color: white;
                border-radius: 10px;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                overflow: hidden;
            }

            .activity-details-image {
                width: 100%;
                height: 400px;
                overflow: hidden;
                border-radius: 10px;
                margin-bottom: 20px;
            }

            .activity-details-image img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .activity-details-content {
                padding: 20px;
                text-align: right;
                direction: rtl;
            }

            .activity-details-content h3 {
                margin: 0 0 20px;
                font-size: 28px;
                color: var(--secondary-color);
                text-align: center;
            }

            .activity-gallery {
                display: flex;
                gap: 15px;
                margin: 20px 0;
                flex-wrap: nowrap;
                overflow-x: auto;
                padding: 10px 0;
            }

            .activity-gallery img {
                width: 250px;
                height: 180px;
                object-fit: cover;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            @media (max-width: 768px) {
                .activity-gallery {
                    flex-direction: column;
                    align-items: center;
                }

                .activity-gallery img {
                    width: 100%;
                    max-width: 400px;
                    height: 250px;
                }
            }

            .activity-description {
                line-height: 1.8;
                margin-bottom: 30px;
                font-size: 16px;
                color: #333;
                white-space: pre-line;
            }

            .back-btn {
                display: inline-block;
                padding: 10px 20px;
                background-color: var(--secondary-color);
                color: white;
                border-radius: 5px;
                text-decoration: none;
                font-weight: bold;
                transition: background-color 0.3s ease;
                margin-top: 20px;
            }

            .back-btn:hover {
                background-color: var(--secondary-color-gradiant);
            }

            .error-message {
                text-align: center;
                padding: 50px 20px;
            }

            @media (max-width: 768px) {
                .activity-details {
                    padding: 10px;
                }

                .activity-details-image {
                    height: 250px;
                }

                .activity-details-content {
                    padding: 15px;
                }

                .activity-details-content h3 {
                    font-size: 24px;
                }
            }
        `;
        document.head.appendChild(styleElement);
    }
});
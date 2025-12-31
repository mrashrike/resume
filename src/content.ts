// Centralized content and placeholder config for the portfolio

export const siteConfig = {
  name: 'Ashish',
  title: 'AI Engineer',
  about: {
    headline: 'Software geek and Planet Observer. Working full time as a AI engineer at Zluri.',
    socials: {
      github: 'https://github.com/mrashrike',
      linkedin: '',
      twitter: '',
      email: '<a href=mrashrike@gmail.com>Email</a>',
      reddit: '',
    },
    resumeUrl: 'https://raw.githubusercontent.com/mrashrike/resume/main/Ashish_resume.pdf',
  },
  experience: [
    
    {
      company: 'Zluri, Bangalore',
      title: 'AI Engineer',
      link: 'https://www.zluri.com/',
      period: 'July 2022 - Present',
      logo: '/zluri.svg',
      highlights: [
        'Over 2 years of experience in AI/ML development with a strong focus on <b>NLP</b> and <b>large language models (LLMs)</b>.',
        'Deployed AI/ML models into <b>AWS production enviroments</b> using <b>Sagemaker and Lamda</b>, optimizing container orchestration to reduce inference costs by <b>{25\%}</b> while maintaining <b>99.9\%</b> availability',
        'Demonstrated excellent communication and collaboration skills within cross-functional teams',
        'Debugged complex systems vulenrabilities by performing meticulous code reviews and root-cause analysis, ensuring <b>99.9\% system uptime</b> and zero security breaches over a 12-month period',
        'Developed and deployed scalable machine learning pipelines using <b>Python and Sckit-learn</b>, automating data preprocessing and feature engineering to reduce model training time by <b>30\%</b>',
        'Proficiently harnessed the power of the pandas library to extract, clean and manipulate Sales data. This process involved several crucial steps to ensure the accuracy and reliability of the information we worked with',
        'Developed and consistently manage Python-based sofwtare <b>Python-based sofwtare</b> Django and React desgined specifically for compression tasks within the <b>swap platform</b> domain.This entails crafting efficient algorithm and processes to optimize data while adhering to industry standards',
        'Additionaly, the role involves the ongoing maintenance, debugging and enhancement of the software to align with the dynamic requirements of the swaps market',
        'Developed <b>Python scripts</b> that identify potential compression oppurtunities for cross-currency and inflation trades. Aiding the bank in reducing the notional value or risk exposure of financial transactions, typically derivatives or other complex instruments, by combining or netting offsetting positions',
        'Contributed to the development of incremental features within the <b>React framework</b> for the compression process platform.My role involved breaking down larger functionalities into smaller, manageable components that could be implemented iteratively. By doing so, I ensured a smooth integration of new capabilities into the existing system',
        'Ideated \& implemented a development workflow for the organization using feature environments, automated testing etc. for multiple services and background jobs resulting in higher engineering productivity and faster project delivery'
      ],
      skills: ['Python 3.12', 'Pandas', 'MySQL', 'AWS S3', 'Tensorflow', 'Datadog', 'CI/CD','ReactJS', 'Redux', 'SQL'],
    },
   
    
  ],
  projects: [
    {
      name: 'Maven Pizza Sales Insight',
      description: 'Analyzing Maven Pizza sales performance and business insights by exploring key metrics, product trends, customer behavior, and peak sales periods, utilizing SQL for querying and Excel for dashboard visualizations',
      githubUrl: 'https://github.com/mrashrike/Mavens-Pizza-Sales-Insight',
      liveUrl: '',
      colors: ['#3b82f6', '#8b5cf6', '#22c55e'],
      badges: ['Python', 'SQL', 'ETL', 'Analysis', 'Data Visualization', 'Data-Pipeline'],
    },
    {
      name: 'Abstroy Hotel Management System',
      description: 'A web-based hotel management system built with Django, Python, SQL Server, HTML, CSS, and JavaScript. Users can book for events like conferences, dining, weddings, etc., with PayPal integration. Admins can manage bookings, services, and user data via a secure dashboard using master pages.',
      githubUrl: 'https://github.com/mrashrike/Abstroy-Hotel-Management-System',
      liveUrl: '',
      colors: ['#2563eb', '#22c55e', '#f97316'],
      badges: ['Python', 'Django', 'SQL', 'Javascript', 'OpenCV'],
      isWinner: true,
    },
    {
      name: 'Predicting Food Delivery Time',
      description: 'A unique ID that represents a restaurant.The location of the restaurant.The cuisines offered by the restaurant.The average cost for one person/order.The minimum order amount.Customer rating for the restaurant.The total number of customer votes for the restaurant.The number of customer reviews for the restaurant.The order delivery time of the restaurant. (Target Classes)',
      githubUrl: 'https://github.com//mrashrike/Predicting-Food-Delivery-Time-Hackathon-by-IMS-Proschool',
      liveUrl: '',
      colors: ['#2563eb', '#22c55e', '#f97316'],
      badges: ['Python', 'Pandas', 'Numpy'],
    },
    {
      name: 'Distributed File System (GFS)',
      description: 'Designed and developed a Distributed File System as part of a group project, where I led the implementation of key components including the master server, chunkserver logic, and client interactions. I implemented robust file-handling strategies at the chunkserver level and was responsible for designing and coding multi-level failure recovery mechanisms to ensure system resilience.',
      githubUrl: 'https://github.com/',
      liveUrl: '',
      colors: ['#ef4444', '#f59e42', '#ec4899'],
      badges: ['Python', 'Django', 'Distributed Systems'],
    },
    
  ],
     github: {
    username: 'my-protfolio',
    // GitHub accounts used for the contributions heatmap:
    // - beforeCutoffUsername: used for all days before cutoffDate
    // - afterCutoffUsername: used for all days on/after cutoffDate
    beforeCutoffUsername: 'my-protfolio',
    afterCutoffUsername: 'ashrike',
    cutoffDate: '2025-06-01',
    contribution_url: 'https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/why-are-my-contributions-not-showing-up-on-my-profile',
  },

  
  
  
  
}; 
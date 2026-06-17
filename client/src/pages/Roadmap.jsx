import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../configs/axios';

const ALL_ROADMAPS = {
  "Full Stack Dev": [
    { level:1, title:"Web Foundations", xp:0, desc:"HTML, CSS, JavaScript basics.", tasks:["Learn HTML5 tags and semantic elements","Master CSS flexbox and grid layout","Learn JavaScript basics and DOM manipulation","Build a personal portfolio static website","Learn Git and GitHub basics"], resources:[{title:"HTML & CSS Full Course",channel:"freeCodeCamp",url:"https://youtube.com/watch?v=mU6anWqZJcc"},{title:"JavaScript Full Course",channel:"Programming with Mosh",url:"https://youtube.com/watch?v=W6NZfCO5SIk"},{title:"Git & GitHub Crash Course",channel:"Traversy Media",url:"https://youtube.com/watch?v=SWYqp7iY_Tc"}]},
    { level:2, title:"JavaScript Deep Dive", xp:400, desc:"ES6+, async/await, APIs.", tasks:["Learn ES6+: arrow functions, destructuring","Understand promises and async/await","Learn fetch API and REST calls","Build a weather app using a public API","Learn arrays, objects, maps"], resources:[{title:"JavaScript ES6+ Course",channel:"Traversy Media",url:"https://youtube.com/watch?v=WZQc7RUAg18"},{title:"Async JavaScript",channel:"Fireship",url:"https://youtube.com/watch?v=PoRJizFvM7s"},{title:"Fetch API Tutorial",channel:"The Net Ninja",url:"https://youtube.com/watch?v=drK3h-yGAJ0"}]},
    { level:3, title:"React & Frontend", xp:900, desc:"Build modern UIs with React.", tasks:["Learn React: JSX, components, props, state","Master useState and useEffect hooks","Learn React Router for navigation","Learn Zustand for state management","Build a full CRUD frontend app"], resources:[{title:"React JS Full Course",channel:"Dave Gray",url:"https://youtube.com/watch?v=RVFAyFWO4go"},{title:"Redux Toolkit Tutorial",channel:"Dave Gray",url:"https://youtube.com/watch?v=NqzdVN2tyvQ"},{title:"React Router Tutorial",channel:"Codevolution",url:"https://youtube.com/watch?v=Ul3y1LXxzdU"}]},
    { level:4, title:"Node.js & Backend", xp:1800, desc:"Build REST APIs with Node and MongoDB.", tasks:["Learn Node.js modules and npm","Build REST APIs with Express.js","Connect MongoDB with Mongoose","Implement JWT authentication","Deploy backend on Render"], resources:[{title:"Node.js Full Course",channel:"Dave Gray",url:"https://youtube.com/watch?v=f2EqECiTBL8"},{title:"MongoDB & Mongoose",channel:"Web Dev Simplified",url:"https://youtube.com/watch?v=DZBGEVgL2eE"},{title:"JWT Auth Tutorial",channel:"Web Dev Simplified",url:"https://youtube.com/watch?v=mbsmsi7l3r4"}]},
    { level:5, title:"DSA & Problem Solving", xp:3000, desc:"Data structures for interviews.", tasks:["Master arrays, strings, hash maps","Learn recursion and sorting","Study trees, graphs, BFS, DFS","Solve 75 LeetCode problems","Practice dynamic programming"], resources:[{title:"DSA Full Course",channel:"freeCodeCamp",url:"https://youtube.com/watch?v=8hly31xKli0"},{title:"Blind 75 Solutions",channel:"NeetCode",url:"https://youtube.com/watch?v=KLlXCFG5TnA"},{title:"Dynamic Programming",channel:"Aditya Verma",url:"https://youtube.com/watch?v=nqowUJzG-iM"}]},
    { level:6, title:"Full Stack Projects", xp:4500, desc:"Build complete projects.", tasks:["Build an e-commerce app with MERN","Build real-time chat with Socket.io","Add CI/CD with GitHub Actions","Write detailed READMEs","Create ATS-friendly resume"], resources:[{title:"MERN Stack Project",channel:"Traversy Media",url:"https://youtube.com/watch?v=CDtPMR5y0QU"},{title:"Real-Time Chat App",channel:"JavaScript Mastery",url:"https://youtube.com/watch?v=HwCqsOis894"},{title:"GitHub Actions CI/CD",channel:"TechWorld with Nana",url:"https://youtube.com/watch?v=R8_veQiYBjI"}]},
    { level:7, title:"Interview Ready", xp:6500, desc:"Crack interviews and land your dream job!", tasks:["Do 5 mock technical interviews","Prepare system design basics","Practice HR questions with STAR method","Apply to 30+ companies","Negotiate your offer!"], resources:[{title:"System Design Basics",channel:"ByteByteGo",url:"https://youtube.com/watch?v=i53Gi_K3o7I"},{title:"HR Interview Questions",channel:"CS Dojo",url:"https://youtube.com/watch?v=cAAwnhPRxMo"},{title:"Salary Negotiation",channel:"Negotiation Mastery",url:"https://youtube.com/watch?v=XY5SeCl_8NE"}]},
  ],
  "AI/ML Engineer": [
    { level:1, title:"Python & Math Foundations", xp:0, desc:"Python, NumPy, statistics basics.", tasks:["Learn Python: variables, loops, functions","Master NumPy and Pandas","Study linear algebra basics","Learn probability and statistics","Complete Python for Data Science course"], resources:[{title:"Python Full Course",channel:"freeCodeCamp",url:"https://youtube.com/watch?v=8DvywoWv6fI"},{title:"NumPy & Pandas Tutorial",channel:"Keith Galli",url:"https://youtube.com/watch?v=vmEHCJofslg"},{title:"Statistics for ML",channel:"StatQuest",url:"https://youtube.com/watch?v=qBigTkBLU6g"}]},
    { level:2, title:"Core Machine Learning", xp:400, desc:"Classical ML algorithms.", tasks:["Learn supervised vs unsupervised learning","Study linear and logistic regression","Learn decision trees and random forests","Practice with scikit-learn","Complete Andrew Ng ML course"], resources:[{title:"ML Full Course",channel:"Stanford Online",url:"https://youtube.com/watch?v=jGwO_UgTS7I"},{title:"Scikit-Learn Tutorial",channel:"Corey Schafer",url:"https://youtube.com/watch?v=0B5eIE_1vpU"},{title:"Random Forests Explained",channel:"StatQuest",url:"https://youtube.com/watch?v=J4Wdy0Wc_xQ"}]},
    { level:3, title:"Deep Learning", xp:900, desc:"Neural networks with TensorFlow.", tasks:["Learn neural network fundamentals","Build models with TensorFlow/Keras","Study CNNs for image classification","Learn RNNs for sequence data","Study transformer architecture"], resources:[{title:"Deep Learning Course",channel:"freeCodeCamp",url:"https://youtube.com/watch?v=tPYj3fFJGjk"},{title:"PyTorch for Deep Learning",channel:"Daniel Bourke",url:"https://youtube.com/watch?v=V_xro1bcAuA"},{title:"Transformers Explained",channel:"Andrej Karpathy",url:"https://youtube.com/watch?v=kCc8FmEb1nY"}]},
    { level:4, title:"First ML Project", xp:1800, desc:"Build and deploy an ML project.", tasks:["Pick a Kaggle dataset","Do full EDA with visualizations","Train and evaluate your model","Build a Streamlit app around it","Deploy on Hugging Face Spaces"], resources:[{title:"End-to-End ML Project",channel:"Krish Naik",url:"https://youtube.com/watch?v=fiz1ORTBGpY"},{title:"Streamlit for ML Apps",channel:"Data Professor",url:"https://youtube.com/watch?v=ZZ4B0QUHuNc"},{title:"Kaggle for Beginners",channel:"Abhishek Thakur",url:"https://youtube.com/watch?v=GJBc9aN5ZCk"}]},
    { level:5, title:"NLP & GenAI", xp:3000, desc:"NLP, LLMs and AI apps.", tasks:["Learn NLP: tokenization, embeddings","Use HuggingFace transformers","Build a RAG app","Learn LangChain for LLM apps","Build an AI chatbot"], resources:[{title:"NLP with HuggingFace",channel:"Abhishek Thakur",url:"https://youtube.com/watch?v=00GKzGyWFEs"},{title:"LangChain Full Course",channel:"freeCodeCamp",url:"https://youtube.com/watch?v=lG7Uxts9SXs"},{title:"RAG from Scratch",channel:"LangChain",url:"https://youtube.com/watch?v=sVcwVQRHIc8"}]},
    { level:6, title:"MLOps & Portfolio", xp:4500, desc:"MLOps and building AI portfolio.", tasks:["Learn MLflow for experiment tracking","Set up training pipeline with DVC","Containerize ML models with Docker","Build 3 end-to-end AI projects","Write blog posts about your projects"], resources:[{title:"MLOps Full Course",channel:"Krish Naik",url:"https://youtube.com/watch?v=pLRmtQ26sWo"},{title:"Docker for Data Scientists",channel:"Corey Schafer",url:"https://youtube.com/watch?v=Kyzwdr-GJ20"},{title:"MLflow Tutorial",channel:"Weights & Biases",url:"https://youtube.com/watch?v=859OxXrt_TI"}]},
    { level:7, title:"Interview Ready", xp:6500, desc:"Crack ML interviews!", tasks:["Study 100 ML interview questions","Practice ML coding rounds","Prepare 3 project case studies","Apply to AI startups and companies","Ace the interview!"], resources:[{title:"ML Interview Questions",channel:"Krish Naik",url:"https://youtube.com/watch?v=e9bV_7oEDzc"},{title:"How to Get ML Job",channel:"Nicholas Renotte",url:"https://youtube.com/watch?v=pMkGQGRWd00"},{title:"Data Science Resume Tips",channel:"Ken Jee",url:"https://youtube.com/watch?v=xrhPjE7wHas"}]},
  ],
  "UI/UX Designer": [
    { level:1, title:"Design Fundamentals", xp:0, desc:"Color theory, typography, layout.", tasks:["Study color theory and hue","Learn typography and font pairing","Understand visual hierarchy","Learn gestalt principles","Recreate 5 popular app UIs"], resources:[{title:"UI Design Fundamentals",channel:"DesignCourse",url:"https://youtube.com/watch?v=tRpoI6vkqLs"},{title:"Color Theory for Designers",channel:"Flux Academy",url:"https://youtube.com/watch?v=_2LLXnUdUIc"},{title:"Typography Tutorial",channel:"The Futur",url:"https://youtube.com/watch?v=yAuUDyUC-GM"}]},
    { level:2, title:"Figma Mastery", xp:400, desc:"Master Figma for design.", tasks:["Learn Figma basics: frames, shapes, text","Master auto-layout for responsive design","Build reusable components","Create a design system","Build and prototype 3 app screens"], resources:[{title:"Figma Full Course",channel:"DesignCourse",url:"https://youtube.com/watch?v=jwCmIBJ8Jtc"},{title:"Figma Auto Layout",channel:"Mizko",url:"https://youtube.com/watch?v=TyaGpGDFczw"},{title:"Design Systems in Figma",channel:"Figma",url:"https://youtube.com/watch?v=EK-pHkc5EL4"}]},
    { level:3, title:"UX Research", xp:900, desc:"User research and design process.", tasks:["Learn user research methods","Create user personas and journey maps","Build low-fidelity wireframes","Conduct usability testing","Iterate designs based on feedback"], resources:[{title:"UX Design Full Course",channel:"Google UX Design",url:"https://youtube.com/watch?v=t0aCoqXKFOU"},{title:"How to Do User Research",channel:"AJ&Smart",url:"https://youtube.com/watch?v=7s_gCkSPfXI"},{title:"Wireframing for Beginners",channel:"CareerFoundry",url:"https://youtube.com/watch?v=KdfO_e0yK-g"}]},
    { level:4, title:"First Case Study", xp:1800, desc:"Design a full product end-to-end.", tasks:["Pick a real problem to solve","Complete full design process","Create high-fidelity screens","Write a detailed case study","Publish on Behance or portfolio site"], resources:[{title:"How to Create UX Case Study",channel:"AJ&Smart",url:"https://youtube.com/watch?v=nSoXExZzoAs"},{title:"Portfolio Website for UX",channel:"Flux Academy",url:"https://youtube.com/watch?v=oMc88hLMhLA"},{title:"Figma Prototyping Tutorial",channel:"DesignCourse",url:"https://youtube.com/watch?v=lTIeZ2ahEkQ"}]},
    { level:5, title:"Advanced UI & Motion", xp:3000, desc:"Advanced UI patterns and animations.", tasks:["Learn advanced Figma variables","Study micro-interactions","Create Lottie animations","Design for accessibility WCAG","Learn mobile-first design patterns"], resources:[{title:"Advanced Figma Prototyping",channel:"Figma",url:"https://youtube.com/watch?v=Dkz_5eOfSW4"},{title:"Micro-interactions in UI",channel:"DesignCourse",url:"https://youtube.com/watch?v=934MCe3X0pA"},{title:"Accessibility in UI Design",channel:"Google",url:"https://youtube.com/watch?v=wkvslBGkhZY"}]},
    { level:6, title:"Portfolio & Job Ready", xp:4500, desc:"Build portfolio and prepare for interviews.", tasks:["Create 3 polished case studies","Practice design challenges","Get portfolio reviewed by designers","Learn to present your work","Apply to product companies and agencies"], resources:[{title:"UX Portfolio Tips",channel:"Google Design",url:"https://youtube.com/watch?v=vM4J-kBT0jU"},{title:"Design Interview Prep",channel:"AJ&Smart",url:"https://youtube.com/watch?v=Gn4QzBhM_qk"},{title:"How to Present UX Work",channel:"CareerFoundry",url:"https://youtube.com/watch?v=FbqBSvFpRpg"}]},
    { level:7, title:"Interview Ready", xp:6500, desc:"Ace design interviews!", tasks:["Complete 3 timed design challenges","Prepare portfolio presentation","Research companies you apply to","Do mock portfolio presentations","Sign the offer!"], resources:[{title:"UX Interview Questions",channel:"CareerFoundry",url:"https://youtube.com/watch?v=RdTdJNjALl8"},{title:"How to Nail Design Interview",channel:"Femke Design",url:"https://youtube.com/watch?v=n0EFXNT_OMo"},{title:"Salary Negotiation",channel:"The Futur",url:"https://youtube.com/watch?v=Z0cvsoFKMgU"}]},
  ],
  "Data Analyst": [
    { level:1, title:"Excel & SQL Foundations", xp:0, desc:"Excel and SQL basics.", tasks:["Master Excel pivot tables and VLOOKUP","Learn SQL SELECT, WHERE, ORDER BY","Practice SQL JOINs","Learn GROUP BY and aggregate functions","Complete SQLZoo tutorial"], resources:[{title:"Excel for Data Analysis",channel:"Alex The Analyst",url:"https://youtube.com/watch?v=pCJ15nGFgVg"},{title:"SQL Full Course",channel:"freeCodeCamp",url:"https://youtube.com/watch?v=HXV3zeQKqGY"},{title:"Advanced SQL",channel:"Alex The Analyst",url:"https://youtube.com/watch?v=9URM1_2S0ho"}]},
    { level:2, title:"Python for Data", xp:400, desc:"Python and Pandas for analysis.", tasks:["Learn Python basics","Master Pandas DataFrames","Learn Matplotlib and Seaborn","Analyze a real dataset","Learn basic statistics"], resources:[{title:"Python for Data Analysis",channel:"Corey Schafer",url:"https://youtube.com/watch?v=ZyhVh-qRZPA"},{title:"Matplotlib Full Tutorial",channel:"Sentdex",url:"https://youtube.com/watch?v=q7Bo_J8x_dw"},{title:"Statistics for Data Science",channel:"StatQuest",url:"https://youtube.com/watch?v=qBigTkBLU6g"}]},
    { level:3, title:"Visualization Tools", xp:900, desc:"Tableau and Power BI dashboards.", tasks:["Learn Tableau and build dashboards","Publish on Tableau Public","Learn Power BI and DAX basics","Build Power BI report with slicers","Study dashboard design principles"], resources:[{title:"Tableau Full Course",channel:"Alex The Analyst",url:"https://youtube.com/watch?v=TPMlZxRRaBQ"},{title:"Power BI Full Course",channel:"Guy in a Cube",url:"https://youtube.com/watch?v=TmhQCQr_0rA"},{title:"Dashboard Design Best Practices",channel:"Tableau",url:"https://youtube.com/watch?v=5XWXW9QFKZE"}]},
    { level:4, title:"First Data Project", xp:1800, desc:"Complete data analysis project.", tasks:["Choose a real-world dataset","Clean and preprocess data","Perform full EDA","Build a dashboard for findings","Write insights report"], resources:[{title:"Data Analyst Portfolio Project",channel:"Alex The Analyst",url:"https://youtube.com/watch?v=qfyynHBFOsM"},{title:"EDA Tutorial with Python",channel:"Ken Jee",url:"https://youtube.com/watch?v=fHFas1K0i0A"},{title:"How to Present Data Insights",channel:"Storytelling with Data",url:"https://youtube.com/watch?v=8EMW7io4rSI"}]},
    { level:5, title:"Advanced Analytics", xp:3000, desc:"A/B testing, cohort analysis.", tasks:["Understand business KPIs","Learn A/B testing and p-values","Practice cohort analysis","Learn funnel analysis","Study time series analysis"], resources:[{title:"A/B Testing Full Course",channel:"Udacity",url:"https://youtube.com/watch?v=7MpHLVAezgs"},{title:"Cohort Analysis Tutorial",channel:"Data School",url:"https://youtube.com/watch?v=b4Uo5RRyFDM"},{title:"Business Metrics for Analysts",channel:"Sundas Khalid",url:"https://youtube.com/watch?v=dSdFJGE76js"}]},
    { level:6, title:"Portfolio & Resume", xp:4500, desc:"Build portfolio and start applying.", tasks:["Build 3 complete analysis projects","Host dashboards on Tableau Public","Create GitHub portfolio with SQL scripts","Write analyst-focused resume","Apply on Naukri and LinkedIn"], resources:[{title:"Data Analyst Portfolio Guide",channel:"Alex The Analyst",url:"https://youtube.com/watch?v=ocdwh0KYeUs"},{title:"Data Analyst Resume Tips",channel:"Ken Jee",url:"https://youtube.com/watch?v=xrhPjE7wHas"},{title:"How to Get Data Analyst Job",channel:"Sundas Khalid",url:"https://youtube.com/watch?v=J1B2_KBkRIM"}]},
    { level:7, title:"Interview Ready", xp:6500, desc:"Crack data analyst interviews!", tasks:["Solve 50 SQL interview questions","Practice 5 business case studies","Explain your projects with impact","Do mock interviews on Pramp","Land your Data Analyst role!"], resources:[{title:"Data Analyst Interview Questions",channel:"Alex The Analyst",url:"https://youtube.com/watch?v=MSBmAdA7hQ4"},{title:"SQL Interview Prep",channel:"Ankit Bansal",url:"https://youtube.com/watch?v=UGzdpDFeKhk"},{title:"Case Study Interview",channel:"Emma Ding",url:"https://youtube.com/watch?v=S0GsGHvRjM0"}]},
  ],
  "DevOps Engineer": [
    { level:1, title:"Linux & Networking", xp:0, desc:"Linux command line and networking basics.", tasks:["Learn Linux navigation and permissions","Write bash scripts","Understand TCP/IP and DNS","Learn SSH for remote servers","Set up Ubuntu VM"], resources:[{title:"Linux Command Line Course",channel:"freeCodeCamp",url:"https://youtube.com/watch?v=sWbUDq4S6Y8"},{title:"Bash Scripting Course",channel:"TechWorld with Nana",url:"https://youtube.com/watch?v=e7BufAVwDiM"},{title:"Networking Fundamentals",channel:"NetworkChuck",url:"https://youtube.com/watch?v=IPvYjXCsTg8"}]},
    { level:2, title:"Docker & Containers", xp:400, desc:"Containerize apps with Docker.", tasks:["Learn Docker images and containers","Write Dockerfiles for apps","Use Docker Compose","Push images to Docker Hub","Learn container security"], resources:[{title:"Docker Full Course",channel:"TechWorld with Nana",url:"https://youtube.com/watch?v=3c-iBn73dDE"},{title:"Docker Compose Tutorial",channel:"Fireship",url:"https://youtube.com/watch?v=HG6yIjZapSA"},{title:"Dockerfile Best Practices",channel:"Bret Fisher",url:"https://youtube.com/watch?v=JofsaZ3H1qM"}]},
    { level:3, title:"CI/CD Pipelines", xp:900, desc:"Automate build and deploy pipelines.", tasks:["Learn GitHub Actions workflows","Set up CI pipeline with tests","Add CD to auto-deploy on merge","Learn Jenkins basics","Understand pipeline as code"], resources:[{title:"GitHub Actions Tutorial",channel:"TechWorld with Nana",url:"https://youtube.com/watch?v=R8_veQiYBjI"},{title:"CI/CD Pipeline from Scratch",channel:"Fireship",url:"https://youtube.com/watch?v=scEDHsr3APg"},{title:"Jenkins Full Course",channel:"freeCodeCamp",url:"https://youtube.com/watch?v=FX322RVNGj4"}]},
    { level:4, title:"Cloud & Infrastructure", xp:1800, desc:"AWS core services and Terraform.", tasks:["Learn AWS EC2, S3, RDS, IAM","Deploy full-stack app on EC2","Set up S3 for file storage","Write Infrastructure as Code with Terraform","Earn AWS Cloud Practitioner cert"], resources:[{title:"AWS Full Course",channel:"freeCodeCamp",url:"https://youtube.com/watch?v=ubCNZFQZZWE"},{title:"Terraform Full Course",channel:"TechWorld with Nana",url:"https://youtube.com/watch?v=7xngnjfIlK4"},{title:"AWS Cloud Practitioner Prep",channel:"freeCodeCamp",url:"https://youtube.com/watch?v=3hLmDS179YE"}]},
    { level:5, title:"Kubernetes", xp:3000, desc:"Container orchestration at scale.", tasks:["Understand K8s architecture","Deploy apps with Deployments and Services","Learn Helm charts","Set up local cluster with Minikube","Deploy to GKE or EKS"], resources:[{title:"Kubernetes Full Course",channel:"TechWorld with Nana",url:"https://youtube.com/watch?v=X48VuDVv0do"},{title:"Helm Charts Tutorial",channel:"TechWorld with Nana",url:"https://youtube.com/watch?v=-ykwb1d0DXU"},{title:"Kubernetes on AWS EKS",channel:"freeCodeCamp",url:"https://youtube.com/watch?v=pMkGQGRWd00"}]},
    { level:6, title:"Monitoring & Security", xp:4500, desc:"Observability and DevSecOps.", tasks:["Set up Prometheus and Grafana","Learn ELK stack for logs","Learn DevSecOps and secret scanning","Learn container security with Trivy","Build a complete DevOps pipeline project"], resources:[{title:"Prometheus & Grafana Tutorial",channel:"TechWorld with Nana",url:"https://youtube.com/watch?v=QoDqxm7ybLc"},{title:"DevSecOps Full Course",channel:"freeCodeCamp",url:"https://youtube.com/watch?v=XnFLQcc-Dos"},{title:"ELK Stack Tutorial",channel:"Traversy Media",url:"https://youtube.com/watch?v=4X0WLg05ASw"}]},
    { level:7, title:"Interview Ready", xp:6500, desc:"Crack DevOps interviews!", tasks:["Practice 50 DevOps interview questions","Prepare system design for high availability","Document all projects with diagrams","Apply to DevOps and SRE roles","Ace the interview!"], resources:[{title:"DevOps Interview Questions",channel:"TechWorld with Nana",url:"https://youtube.com/watch?v=j3jNXhUNVA0"},{title:"SRE Interview Prep",channel:"Google SRE",url:"https://youtube.com/watch?v=uTEL8Ff1Zvk"},{title:"System Design for DevOps",channel:"ByteByteGo",url:"https://youtube.com/watch?v=i53Gi_K3o7I"}]},
  ],
  "Cybersecurity": [
    { level:1, title:"Networking & Linux", xp:0, desc:"Networking fundamentals and Linux basics.", tasks:["Master OSI model and TCP/IP","Learn DNS, HTTP, HTTPS, SSH","Set up Kali Linux on VM","Learn Linux command line","Complete TryHackMe Pre-Security path"], resources:[{title:"Networking for Hackers",channel:"NetworkChuck",url:"https://youtube.com/watch?v=IPvYjXCsTg8"},{title:"Kali Linux Full Course",channel:"freeCodeCamp",url:"https://youtube.com/watch?v=lZAoFs75_cs"},{title:"TryHackMe Beginner Guide",channel:"John Hammond",url:"https://youtube.com/watch?v=rTazoqvuq3o"}]},
    { level:2, title:"Security Fundamentals", xp:400, desc:"Cryptography, firewalls, authentication.", tasks:["Learn cryptography: AES, RSA, SHA","Understand PKI and TLS/SSL","Study firewalls, IDS/IPS, VPNs","Learn authentication: MFA, OAuth, JWT","Study CompTIA Security+ objectives"], resources:[{title:"Cryptography Full Course",channel:"freeCodeCamp",url:"https://youtube.com/watch?v=AQDCe585Lnc"},{title:"CompTIA Security+ Course",channel:"Professor Messer",url:"https://youtube.com/watch?v=9NE33fpQuw8"},{title:"How TLS/HTTPS Works",channel:"ByteByteGo",url:"https://youtube.com/watch?v=AlE5X1NlHgg"}]},
    { level:3, title:"Ethical Hacking & Tools", xp:900, desc:"Offensive security and hacking tools.", tasks:["Learn Nmap for scanning","Use Metasploit for exploitation","Learn Burp Suite for web testing","Understand Wireshark for packet analysis","Complete 5 TryHackMe rooms"], resources:[{title:"Ethical Hacking Full Course",channel:"freeCodeCamp",url:"https://youtube.com/watch?v=3Kq1MIfTWCE"},{title:"Metasploit Tutorial",channel:"David Bombal",url:"https://youtube.com/watch?v=8lR27r8Y_ik"},{title:"Burp Suite Tutorial",channel:"PortSwigger",url:"https://youtube.com/watch?v=G3hpAeoZ4ek"}]},
    { level:4, title:"Web App Security", xp:1800, desc:"OWASP Top 10 vulnerabilities.", tasks:["Study OWASP Top 10","Practice SQL injection on DVWA","Learn XSS: reflected, stored, DOM","Practice on PortSwigger labs","Complete first HackTheBox machine"], resources:[{title:"OWASP Top 10 Course",channel:"TCM Security",url:"https://youtube.com/watch?v=rWHvp7rUka8"},{title:"SQL Injection Tutorial",channel:"HackerSploit",url:"https://youtube.com/watch?v=cx6Xs3F_1Uc"},{title:"Web Security Academy",channel:"Rana Khalil",url:"https://youtube.com/watch?v=qmnBsWuZVj8"}]},
    { level:5, title:"CTF & Home Lab", xp:3000, desc:"CTF challenges and home lab setup.", tasks:["Set up home lab with vulnerable VMs","Complete 10 HackTheBox machines","Participate in a live CTF competition","Write 5 machine writeups on GitHub","Start bug bounty on HackerOne"], resources:[{title:"Home Lab Setup",channel:"NetworkChuck",url:"https://youtube.com/watch?v=pKeR1x9Klco"},{title:"How to Write CTF Writeups",channel:"John Hammond",url:"https://youtube.com/watch?v=aUHDT7sTYQA"},{title:"Bug Bounty for Beginners",channel:"InsiderPhD",url:"https://youtube.com/watch?v=qlK174d_uu8"}]},
    { level:6, title:"Certifications & Portfolio", xp:4500, desc:"Earn certs and build security portfolio.", tasks:["Earn CompTIA Security+ cert","Study for CEH or eJPT","Build portfolio with CTF writeups","Contribute to open-source security tools","Apply to SOC and pen testing roles"], resources:[{title:"CompTIA Security+ Prep",channel:"Professor Messer",url:"https://youtube.com/watch?v=9NE33fpQuw8"},{title:"eJPT Certification Guide",channel:"TCM Security",url:"https://youtube.com/watch?v=T5GlM2-3Dg4"},{title:"How to Build Cyber Portfolio",channel:"Gerald Auger",url:"https://youtube.com/watch?v=bANkKkRSb4Q"}]},
    { level:7, title:"Interview Ready", xp:6500, desc:"Crack cybersecurity interviews!", tasks:["Study 50 cybersecurity interview questions","Practice explaining CTF findings","Prepare for technical interview rounds","Apply to SOC and AppSec roles","Land your cybersecurity role!"], resources:[{title:"Cybersecurity Interview Questions",channel:"TCM Security",url:"https://youtube.com/watch?v=Dv-mMl59Cjk"},{title:"SOC Analyst Interview Prep",channel:"Gerald Auger",url:"https://youtube.com/watch?v=3c-iBn73dDE"},{title:"How to Get Into Cybersecurity",channel:"NetworkChuck",url:"https://youtube.com/watch?v=pBeHVFCl2_o"}]},
  ],
};

export default function Roadmap() {
  const [user, setUser] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await API.get('/xp/dashboard');
        setUser(data);
        setCompletedTasks(data.completedTasks || []);
      } catch {
        navigate('/login');
      }
    };
    fetchUser();
  }, []);

  const showToast = (msg, color) => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 2500);
  };

  const toggleTask = async (levelIdx, taskIdx) => {
    const key = `level-${levelIdx}-task-${taskIdx}`;
    if (completedTasks.includes(key)) return showToast('Already completed!', 'bg-gray-500');
    try {
      const { data } = await API.post('/xp/complete-task', { taskKey: key });
      setCompletedTasks(prev => [...prev, key]);
      setUser(prev => ({ ...prev, xp: data.xp, level: data.level }));
      showToast('+80 XP earned! 🎉', 'bg-green-500');
    } catch {
      showToast('Error!', 'bg-red-500');
    }
  };

  const isDone = (li, ti) => completedTasks.includes(`level-${li}-task-${ti}`);

  const career = user?.career || 'Full Stack Dev';
  const LEVELS = ALL_ROADMAPS[career] || ALL_ROADMAPS['Full Stack Dev'];

  const thresholds = [0, 400, 900, 1800, 3000, 4500, 6500];
  const userLevel = user?.level || 1;
  const userXP = user?.xp || 0;
  const nextXP = thresholds[userLevel] || 7000;
  const prevXP = thresholds[userLevel - 1] || 0;
  const progress = nextXP > prevXP ? Math.round(((userXP - prevXP) / (nextXP - prevXP)) * 100) : 100;

  return (
    <div className="min-h-screen bg-teal-200">

      {toast && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 ${toast.color} text-white px-6 py-3 rounded-2xl font-bold text-sm z-50 shadow-lg`}>
          {toast.msg}
        </div>
      )}

      <nav className="bg-white/50 backdrop-blur border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/dashboard')} className="text-gray-400 hover:text-gray-600 cursor-pointer">←</button>
            <span className="text-xl font-black text-gray-800">🗺️ {career} Roadmap</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-yellow-50 border border-yellow-200 rounded-full px-4 py-1.5 text-yellow-600 font-bold text-sm">⚡ {userXP} XP</div>
            <div className="bg-pink-50 border border-pink-200 rounded-full px-4 py-1.5 text-pink-600 font-bold text-sm">Level {userLevel}</div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-bold text-gray-600">Level {userLevel} Progress</span>
            <span className="text-sm font-bold text-gray-600">{userXP} / {nextXP} XP</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-pink-400 to-teal-400 rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-gray-400 mt-2">{progress}% to Level {userLevel + 1}</p>
        </div>

        <div className="flex flex-col gap-4">
          {LEVELS.map((lvl, idx) => {
            const unlocked = userXP >= lvl.xp;
            const isCurrent = userLevel === lvl.level;
            const isOpen = expanded === idx;
            const allDone = lvl.tasks.every((_, ti) => isDone(idx, ti));

            return (
              <div key={lvl.level} className={`bg-indigo-500 rounded-2xl  hover:bg-indigo-600 border shadow-sm overflow-hidden transition-all
                ${isCurrent ? 'border-pink-300 shadow-pink-100' : 'border-gray-100'}
                ${!unlocked ? 'opacity-50' : ''}`}>

                <div onClick={() => unlocked && setExpanded(isOpen ? null : idx)}
                  className={`flex items-center gap-4 p-5 ${unlocked ? 'cursor-pointer ' : 'cursor-not-allowed'} transition`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black flex-shrink-0
                    ${allDone ? 'bg-green-100 text-green-600' : unlocked ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-400'}`}>
                    {unlocked ? (allDone ? '✓' : lvl.level) : '🔒'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-black text-gray-800">{lvl.title}</span>
                      {isCurrent && <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full font-bold">Current</span>}
                      {allDone && <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-bold">Done ✓</span>}
                    </div>
                    <p className="text-xs text-gray-800">{lvl.desc}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-bold text-pink-500">{lvl.xp} XP</p>
                    {unlocked && <p className="text-gray-800 font-semibold text-lg">{isOpen ? '▲' : '▼'}</p>}
                  </div>
                </div>

                {isOpen && unlocked && (
                  <div className="border-t border-gray-100 bg-gray-50">
                    <div className="p-5">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">✅ Tasks — +80 XP each</p>
                      <div className="flex flex-col gap-2">
                        {lvl.tasks.map((task, ti) => {
                          const done = isDone(idx, ti);
                          return (
                            <div key={ti} onClick={() => toggleTask(idx, ti)}
                              className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition
                                ${done ? 'bg-green-50 border border-green-200' : 'bg-white border border-gray-200 hover:border-pink-200'}`}>
                              <div className={`w-5 h-5 rounded-md flex-shrink-0 flex items-center justify-center text-xs font-black
                                ${done ? 'bg-green-500 text-white' : 'border-2 border-gray-200'}`}>
                                {done ? '✓' : ''}
                              </div>
                              <span className={`text-sm ${done ? 'line-through text-gray-400' : 'text-gray-700'}`}>{task}</span>
                              {done && <span className="ml-auto text-xs font-bold text-green-500">+80 XP</span>}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="px-5 pb-5">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">📺 YouTube Resources</p>
                      <div className="flex flex-col gap-2">
                        {lvl.resources.map((r, ri) => (
                          <a key={ri} href={r.url} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-xl hover:border-teal-300 transition group">
                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">▶️</div>
                            <div className="flex-1">
                              <p className="text-sm font-semibold text-gray-700 group-hover:text-teal-600">{r.title}</p>
                              <p className="text-xs text-gray-400">📺 {r.channel}</p>
                            </div>
                            <span className="text-xs text-teal-500 font-bold">Watch →</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
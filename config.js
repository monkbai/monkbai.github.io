const USER_CONFIG = {
  name: "Zhibo Liu",
  displayName: "Zhibo Liu (刘智博)",
  promptLabel: "zhiboliu@nju",
  initials: "ZL",
  role: "Associate Professor",
  university: "School of Computer Science, Nanjing University",
  location: "Nanjing, China",
  address: "163 Xianlin Avenue, Qixia District, Nanjing, Jiangsu, China",
  office: "Xianlin Campus, Computer Science and Technology Building 706",
  email: "zhiboliu [at] nju [dot] edu [dot] cn",
  bio: "Associate Professor at the School of Computer Science, Nanjing University.",
  supervisorName: "Prof. Shuai Wang",
  supervisorUrl: "https://www.cse.ust.hk/~shuaiw/",
  about: [
    "Zhibo Liu is an Associate Professor in the School of Computer Science at Nanjing University since 2026.",
    "Previously, he was a Postdoctoral Researcher at the Hong Kong University of Science and Technology (HKUST) from 2023 to 2025, supported by the HK RGC Postdoctoral Fellowship Scheme.",
    "He obtained his Ph.D. in 2023 from the Department of Computer Science and Engineering at HKUST, under the supervision of Prof. Shuai Wang. Before joining HKUST, he received his B.Eng. degree from Nankai University in 2019.",
    "His current research focuses on software reverse engineering and binary analysis, with broader interests in computer security and software engineering."
  ],
  recruitment: {
    text: "I am looking for motivated students and collaborators in software security and software engineering. Feel free to email me if you are interested in working together!",
    // contact: "zhiboliu [at] nju [dot] edu [dot] cn",
    // contactHref: "mailto:zhiboliu@nju.edu.cn"
  },
  focus: ["Computer Security", "Binary Analysis", "Software Reverse Engineering", "Software Engineering"],
  latestUpdate: "March 2026",
  // photo: "https://monkbai.github.io/images/cyber-hacker-icon.png",
  photo: "pic/photo1.png",
  photoDark: "pic/photo2.png",

  stats: [
    { value: "29", label: "Publications" },
    { value: "2", label: "Distinguished Paper Awards" },
    { value: "1", label: "Postdoctoral Fellowship" }
  ],

  links: {
    website: "https://monkbai.github.io/",
    cv: "files/CV-Zhibo_Liu.pdf",
    github: "https://github.com/monkbai",
    scholar: "https://scholar.google.com/citations?hl=en&user=kIsmHd4AAAAJ",
    orcid: "https://orcid.org/0000-0002-7872-1129"
  },

  paperNote: "(* denotes corresponding author)",

  publications: [
    {
      year: 2026,
      venue: "EuroSys 2026",
      title: "No More Translation at Runtime: LLM-Empowered Static Binary Translation",
      authors: "Zhibo Liu, Huaijin Wang, Wai Kin Wong, Daoyuan Wu, and Shuai Wang.",
      links: {}
    },
    {
      year: 2025,
      venue: "CCS 2025",
      title: "The Phantom Menace in PET-Hardened Deep Learning Models: Invisible Configuration-Induced Attacks",
      authors: "Yiteng Peng, Dongwei Xiao, Zhibo Liu, Zhenlan Ji, Daoyuan Wu, Shuai Wang, and Juergen Rahmel.",
      links: {}
    },
    {
      year: 2025,
      venue: "CCS 2025",
      title: "An Empirical Study Measuring In-The-Wild Cryptographic Microarchitectural Side-Channel Patches",
      authors: "Sen Deng, Zhibo Liu*, Shuai Wang, and Yinqian Zhang*.",
      links: {}
    },
    {
      year: 2025,
      venue: "PLDI 2025",
      title: "Divergence-aware Testing of Graphics Shader Compiler Back-ends",
      authors: "Dongwei Xiao, Shuai Wang, Zhibo Liu, Yiteng Peng, Daoyuan Wu, and Zhendong Su.",
      links: {},
      note: "Selected by MIT Programming Languages Review for an Invited Talk"
    },
    {
      year: 2025,
      venue: "ISSTA 2025",
      title: "DecLLM: LLM-Augmented Recompilable Decompilation for Enabling Programmatic Use of Decompiled Code",
      authors: "Wai Kin Wong, Daoyuan Wu*, Huaijin Wang, Zongjie Li, Zhibo Liu*, Shuai Wang*, Qiyi Tang, Sen Nie, and Shi Wu.",
      links: {},
      note: "PACMSE 2025 featured article"
    },
    {
      year: 2025,
      venue: "ICSE 2025",
      title: "Preserving Privacy in Software Composition Analysis: A Study of Technical Solutions and Enhancements",
      authors: "Huaijin Wang, Zhibo Liu*, Yanbo Dai, Shuai Wang, Qiyi Tang, Sen Nie, and Shi Wu.",
      links: {}
    },
    {
      year: 2025,
      venue: "ICSE 2025",
      title: "Testing and Understanding Deviation Behaviors in FHE-hardened Machine Learning Models",
      authors: "Yiteng Peng, Daoyuan Wu, Zhibo Liu, Dongwei Xiao, Zhenlan Ji, Juergen Rahmel, and Shuai Wang.",
      links: {}
    },
    {
      year: 2025,
      venue: "IEEE S&P 2025",
      title: "CipherSteal: Stealing Input Data from TEE-Shielded Neural Networks with Ciphertext Side Channels",
      authors: "Yuanyuan Yuan, Zhibo Liu, Sen Deng, Ynazuo Chen, Shuai Wang, Yinqian Zhang, and Zhendong Su.",
      links: {},
      note: "🏆 Distinguished Paper Award"
    },
    {
      year: 2025,
      venue: "NDSS 2025",
      title: "MTZK: Testing and Exploring Bugs in Zero-Knowledge (ZK) Compilers",
      authors: "Dongwei Xiao, Zhibo Liu*, Yiteng Peng, and Shuai Wang*",
      links: {}
    },
    {
      year: 2025,
      venue: "NDSS 2025",
      title: "BitShield: Defending Against Bit-Flip Attacks on DNN Executables",
      authors: "Yanzuo Chen, Yuanyuan Yuan, Zhibo Liu, Sihang Hu, Tianxiang Li, and Shuai Wang",
      links: {}
    },
    {
      year: 2025,
      venue: "NDSS 2025",
      title: "Compiled Models, Built-In Exploits: Uncovering Pervasive Bit-Flip Attack Surfaces in DNN Executables",
      authors: "Yanzuo Chen, Zhibo Liu, Yuanyuan Yuan, Sihang Hu, Tianxiang Li, and Shuai Wang",
      links: {}
    },
    {
      year: 2024,
      venue: "Black Hat Europe 2024",
      title: "The Devil is in the (Micro-) Architectures: Uncovering New Side-Channel and Bit-Flip Attack Surfaces in DNN Executables",
      authors: "Yanzuo Chen, Zhibo Liu (co-speaker), Yuanyuan Yuan, Tianxiang Li, Sihang Hu, Zhihui Lin, and Shuai Wang",
      links: {
        talk: "https://www.blackhat.com/eu-24/briefings/schedule/#the-devil-is-in-the-micro--architectures-uncovering-new-side-channel-and-bit-flip-attack-surfaces-in-dnn-executables-42018"
      }
    },
    {
      year: 2024,
      venue: "CCS 2024",
      title: "DeepCache: Revisiting Cache Side-Channel Attacks in Deep Neural Networks Executables",
      authors: "Zhibo Liu, Yuanyuan Yuan, Yanzuo Chen, Sihang Hu, Tianxiang Li, and Shuai Wang",
      links: {
        paper: "https://github.com/monkbai/monkbai.github.io/blob/master/files/deepcache.pdf",
        fixed_paper: "https://github.com/monkbai/monkbai.github.io/blob/master/files/deepcache.pdf"
      }
    },
    {
      year: 2024,
      venue: "CCS 2024",
      title: "HyperTheft: Thieving Model Weights from TEE-Shielded Neural Networks via Ciphertext Side Channels",
      authors: "Yuanyuan Yuan, Zhibo Liu, Sen Deng, Yanzuo Chen, Shuai Wang, Yinqian Zhang, and Zhendong Su",
      links: {
        paper: "https://dl.acm.org/doi/10.1145/3658644.3690317"
      }
    },
    {
      year: 2024,
      venue: "Euro S&P 2024",
      title: "Are We There Yet? Filling the Gap Between ML-Based Binary Similarity Analysis and Binary Software Composition Analysis",
      authors: "Huaijin Wang, Zhibo Liu*, Shuai Wang*, Ying Wang, Qiyi Tang, Sen Nie, Shi Wu",
      links: {
        paper: "https://ieeexplore.ieee.org/abstract/document/10629030"
      }
    },
    {
      year: 2024,
      venue: "FSE 2024",
      title: "DTD: Comprehensive and Scalable Testing for Debuggers",
      authors: "Hongyi Lu, Zhibo Liu*, Shuai Wang, and Fengwei Zhang*",
      links: {
        paper: "https://dl.acm.org/doi/10.1145/3643779"
      }
    },
    {
      year: 2024,
      venue: "FSE 2024",
      title: "Metamorphic Testing of Secure Multi-Party Computation (MPC) Compilers",
      authors: "Yichen Li, Dongwei Xiao, Zhibo Liu, Qi Pang, and Shuai Wang",
      links: {
        paper: "https://dl.acm.org/doi/10.1145/3643781"
      }
    },
    {
      year: 2024,
      venue: "TDSC 2024",
      title: "Evaluating C/C++ Vulnerability Detectability of Query-Based Static Application Security Testing Tools",
      authors: "Zongjie Li, Zhibo Liu, Wai Kin Wong, Pingchuan Ma, and Shuai Wang",
      links: {
        paper: "https://ieeexplore.ieee.org/document/10400834"
      }
    },
    {
      year: 2023,
      venue: "ASE 2023",
      title: "PHYFU: Fuzzing Modern Physics Simulation Engines",
      authors: "Dongwei Xiao, Zhibo Liu, Shuai Wang.",
      links: {
        paper: "https://arxiv.org/abs/2307.10818"
      },
      note: "🏆 ACM SIGSOT Distinguished Paper Award"
    },
    {
      year: 2023,
      venue: "Black Hat USA 2023",
      title: "BTD: Unleashing the Power of Decompilation for x86 Deep Neural Network Executables",
      authors: "Zhibo Liu, Yuanyuan Yuan, Xiaofei Xie, Tianxiang Li, Wenqiang Li, and Shuai Wang.",
      links: {
        talk: "https://www.blackhat.com/us-23/briefings/schedule/index.html#btd-unleashing-the-power-of-decompilation-for-x-deep-neural-network-executables-33028"
      }
    },
    {
      year: 2023,
      venue: "ISSTA 2023",
      title: "Exploring Missed Optimizations in WebAssembly Optimizers",
      authors: "Zhibo Liu, Dongwei Xiao, Zongjie Li, Shuai Wang, Wei Meng.",
      links: {
        paper: "https://dl.acm.org/doi/10.1145/3597926.3598068",
        preprint: "https://github.com/monkbai/monkbai.github.io/blob/master/files/issta23-ditwo.pdf"
      }
    },
    {
      year: 2023,
      venue: "ICSE 2023",
      title: "Metamorphic Shader Fusion for Testing Graphics Shader Compilers",
      authors: "Dongwei Xiao, Zhibo Liu, Shuai Wang.",
      links: {
        paper: "https://ieeexplore.ieee.org/document/10172737"
      }
    },
    {
      year: 2023,
      venue: "ICSE 2023",
      title: "CCTEST: Testing and Repairing Code Completion Systems",
      authors: "Zongjie Li, Chaozheng Wang, Zhibo Liu, Haoxuan Wang, Dong Chen, Shuai Wang, Cuiyun Gao.",
      links: {
        paper: "https://arxiv.org/abs/2208.08289"
      }
    },
    {
      year: 2023,
      venue: "USENIX Security 2023",
      title: "CacheQL: Quantifying and Localizing Cache Side-Channel Vulnerabilities in Production Software",
      authors: "Yuanyuan Yuan, Zhibo Liu, Shuai Wang.",
      links: {
        paper: "https://arxiv.org/abs/2209.14952",
        code: "https://github.com/Yuanyuan-Yuan/CacheQL"
      }
    },
    {
      year: 2023,
      venue: "USENIX Security 2023",
      title: "Decompiling x86 Deep Neural Network Executables",
      authors: "Zhibo Liu, Yuanyuan Yuan, Shuai Wang, Xiaofei Xie, Lei Ma.",
      links: {
        paper: "https://github.com/monkbai/monkbai.github.io/blob/master/files/sec23-btd-badges.pdf",
        extended: "https://arxiv.org/abs/2210.01075",
        code: "https://github.com/monkbai/DNN-decompiler"
      },
      starRepo: "monkbai/DNN-decompiler",
      note: "🎉 Artifact badges: Available, Functional, Reproduced"
    },
    {
      year: 2022,
      venue: "TSE 2022",
      title: "Enhancing DNN-Based Binary Code Function Search With Low-Cost Equivalence Checking",
      authors: "Huaijin Wang, Pingchuan Ma, Yuanyuan Yuan, Zhibo Liu, Shuai Wang, Qiyi Tang, Sen Nie, Shi Wu.",
      links: {
        paper: "https://ieeexplore.ieee.org/document/9707874",
        code: "https://github.com/computer-analysis/BinUSE"
      }
    },
    {
      year: 2022,
      venue: "IEEE T-IFS 2022",
      title: "NeuralD: Detecting Indistinguishability Violations of Oblivious RAM with Neural Distinguishers",
      authors: "Pingchuan Ma, Zhibo Liu, Yuanyuan Yuan, and Shuai Wang.",
      links: {
        paper: "https://ieeexplore.ieee.org/document/9722877",
        code: "https://github.com/pckennethma/NeuralD"
      }
    },
    {
      year: 2022,
      venue: "SIGMETRICS 2022",
      title: "Metamorphic Testing of Deep Learning Compilers",
      authors: "Dongwei Xiao, Zhibo Liu, Yuanyuan Yuan, Qi Pang, and Shuai Wang.",
      links: {
        paper: "https://dl.acm.org/doi/abs/10.1145/3508035",
        code: "https://github.com/Wilbur-Django/Testing-DNN-Compilers"
      }
    },
    {
      year: 2022,
      venue: "IEEE S&P 2022",
      title: "SoK: Demystifying Binary Lifters Through the Lens of Downstream Applications",
      authors: "Zhibo Liu, Yuanyuan Yuan, Shuai Wang, Yuyan Bao.",
      links: {
        paper: "https://ieeexplore.ieee.org/document/9833799",
        artifact: "https://github.com/monkbai/ir_lifting_data"
      }
    },
    {
      year: 2022,
      venue: "CCS 2022",
      title: "Cache Refinement Type for Side-channel Detection of Cryptographic Software",
      authors: "Ke Jiang, Yuyan Bao, Shuai Wang, Zhibo Liu, Tianwei Zhang.",
      links: {
        paper: "https://arxiv.org/abs/2209.04610"
      }
    },
    {
      year: 2020,
      venue: "ISSTA 2020",
      title: "How far we have come: testing decompilation correctness of C decompilers",
      authors: "Zhibo Liu, Shuai Wang.",
      links: {
        paper: "https://dl.acm.org/doi/10.1145/3395363.3397370",
        code: "https://github.com/monkbai/DecFuzzer"
      },
      note: "🎉 Artifact badge: Functional"
    }
  ],

  news: [
    { date: "2026.02", badge: "New", text: "Joined Nanjing University." },
    // { date: "2026.03", badge: "Info", text: "Homepage profile updated with publications, services, and honors." },
    { date: "2025.05", badge: "Award", text: "CipherSteal (IEEE S&P 2025) received a Distinguished Paper Award." },
    // { date: "2025.01", badge: "New", text: "Multiple 2025 papers accepted at CCS, PLDI, ISSTA, ICSE, and NDSS." },
    { date: "2024.12", badge: "Talk", text: "Black Hat Europe talk on side-channel and bit-flip attack surfaces in DNN executables." },
    { date: "2024.03", badge: "Award", text: "Received HKUST CSE Best PhD Dissertation Award (2022-23) - Honorable Mention." },
    { date: "2023.12", badge: "Award", text: "Supported by HK RGC Postdoctoral Fellowship Scheme (PDFS)." },
    { date: "2023.09", badge: "Award", text: "ACM SIGSOFT Distinguished Paper Award at ASE 2023." },
    { date: "2023.08", badge: "Talk", text: "Presented 'BTD: Unleashing the Power of Decompilation for x86 Deep Neural Network Executables' at Black Hat USA 2023." }
  ],

  experience: [
    { period: "Jan 2026 – Present", role: "Associate Professor", institution: "School of Computer Science, Nanjing University" },
    { period: "Oct 2023 – Dec 2025", role: "Postdoctoral Researcher", institution: "Hong Kong University of Science and Technology" }
  ],

  education: [
    { period: "Sept 2019 – Sept 2023", degree: "Ph.D. in Computer Science", institution: "Hong Kong University of Science and Technology" },
    { period: "Sept 2015 – June 2019", degree: "B.E. in Information Security", institution: "Nankai University" }
  ],

  services: [
    {
      category: "Program Committee Member",
      items: [
        "2026: CCS",
      ]
    },
    {
      category: "Reviewer",
      items: [
        "2026: TDSC",
        "2025: TDSC, TIFS, TOSEM, TPDS",
        "2024: TDSC",
        "2023: TIFS, TDSC"
      ]
    },
    {
      category: "Artifact Evaluation Committee",
      items: [
        "2023: USENIX Security, ISSTA",
        "2022: ISSTA, OSDI, USENIX ATC, WiSec"
      ]
    },
    {
      category: "External Reviewer",
      items: [
        "2025: IEEE S&P",
        "2024: IEEE S&P, USENIX Security",
        "2023: IEEE S&P, USENIX Security, ISSTA, NeurIPS, SANER ERA Track",
        "2022: ASE, NDSS BAR, CCS, AsiaCCS",
        "2020: TIFS, ICICS, ICSE SEIP"
      ]
    }
  ],

  teaching: [
    "Teaching Assistant for COMP 3632: Principles of Cybersecurity (HKUST, Spring 2023)",
    "Teaching Assistant for COMP 3632: Principles of Cybersecurity (HKUST, Fall 2020)",
    "Teaching Assistant for COMP 3632: Principles of Cybersecurity (HKUST, Spring 2020)"
  ],

  honors: [
    { year: "2025", text: "IEEE S&P Distinguished Paper Award" },
    { year: "2024", text: "Black Hat Europe Briefing Speaker (London, UK)" },
    { year: "2023", text: "HK RGC Postdoctoral Fellowship Scheme" },
    { year: "2023", text: "HKUST CSE Best PhD Dissertation Award (2022-23) - Honorable Mention" },
    { year: "2023", text: "ACM SIGSOFT Distinguished Paper Award at ASE 2023" },
    { year: "2023", text: "Black Hat USA Briefing Speaker (Las Vegas, USA)" },
    { year: "2019-2023", text: "HKUST Postgraduate Studentship" },
    { year: "2022", text: "HKUST Research Travel Grant" },
    { year: "2022", text: "HKUST RedBird Academic Excellence Award" }
  ],

  misc: [
    {
      text: "The Good, the Bad, and the Bye Bye",
      href: "https://reyammer.io/blog/2020/10/03/the-good-the-bad-and-the-bye-bye-why-i-left-my-tenured-academic-job/",
      note: "by Yanick 'reyammer' Fratantonio"
    }
  ]
};

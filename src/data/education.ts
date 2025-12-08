import { Degree } from "../types";
import northeastenIcon from "../icons/northeastern.png";
import snuIcon from "../icons/snu.png";

export const DEGREES: Degree[] = [
    {
        title: "Master of Science",
        degree: "Computer Systems Engineering (IoT Specialization)",
        school: "Northeastern University",
        location: "Boston, MA",
        period: "Aug 2019 - May 2021",
        icon: northeastenIcon,
        gpa: "4.0",
        details: [
            "President, NU IotConnect Club",
            "Graduate Student Ambassador, College of Engineering",
        ],
        coursework: [
            "Web Development",
            "Foundations of AI",
            "Data Mining",
            "UX Design",
            "Connected Devices",
            "Data Networking",
            "Object Oriented Design",
        ],
    },
    {
        title: "Bachelor of Technology",
        degree: "Electronics and Communication Engineering",
        school: "Shiv Nadar University",
        location: "Delhi, India",
        period: "Aug 2014 - May 2018",
        icon: snuIcon,
        gpa: "3.7",
        details: [
            "Minor: Computer Science Engineering",
            "Chairperson, SNU Food Committee",
        ],
        coursework: [
            "Computer Networks",
            "Computer Architecture",
            "Operating Systems",
            "Data Structures",
            "Object Oriented Programming",
            "Wireless Sensor Networks",
        ],
    },
];

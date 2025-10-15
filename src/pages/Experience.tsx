import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Chip,
  Stack,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import ddIcon from "../icons/ddicon.png";
import cvsIcon from "../icons/cvs.png";
import northeasternIcon from "../icons/northeastern.png";
import smartprixIcon from "../icons/smartprix.png";

type Job = {
  title: string;
  organization: string;
  location: string;
  period: string;
  icon: string;
  bullets?: string[];
  tags?: string[];
};

const JOBS: Job[] = [
  {
    title: "Senior Software Engineer",
    organization: "Branding Brand Inc.",
    location: "Boston, MA",
    period: "Jan 2025 - Present",
    icon: cvsIcon,
    bullets: [
      "Contributing to the modernization of CVS Health's legacy Java-based pharmacy application—used across 10,000 stores nationwide—by helping rebuild core workflows in React, enhancing usability and performance.",
      "Collaborated with a team of senior engineers to architect scalable solutions, reducing component re-renders and improving workflow efficiency by ~30% in high-traffic areas of the app.",
      "Partnered with cross-functional teams (UX, product, backend) to deliver features impacting millions of prescriptions processed daily, while adapting to shifting requirements under tight deadlines.",
      "Mentored 2 - 3 junior developers weekly, providing guidance on architecture, code quality, and best practices",
      "Spearheaded reusable component patterns and accessibility improvements, directly reducing duplicate UI logic by 40% across prescriber flows.",
    ],
    tags: ["React", "UX", "Accessibility", "Mentorship", "Scalability"],
  },
  {
    title: "Software Engineer II",
    organization: "Ductus Inc.",
    location: "Maynard, MA",
    period: "June 2021 - August 2024",
    icon: ddIcon,
    bullets: [
      "Delivered 10+ projects in React and Angular for a client to help with network automation",
      "Collaborated with cross-functional teams to plan and design applications, providing frontend insights and translating requirements into Figma wireframes",
      "Advocated for and integrated the UX design lifecycle, ensuring user-friendly applications and optimizing development time through better requirements gathering, user flows, and usability testing",
      "Spearheaded discussions to determine frontend architecture, select optimal patterns and libraries for efficient development, and improve testing standards",
      "Advocated for better testing practices and trained new developers in utilizing frameworks such as Testing Library, Enzyme, Jest",
      "Trained and onboarded new team members, integrating them into projects and sharing knowledge through code reviews and pair programming to enhance code quality",
      "Proactively updated our development lifecycle with tools like Swagger mock server, GitHub Copilot, and Figma developer mode, reducing development time, and trained teammates on their use",
    ],
    tags: ["React", "Angular", "Testing", "UX"],
  },
  {
    title: "Software Engineer Co-Op",
    organization: "Ductus Inc.",
    location: "Maynard, MA",
    period: "May 2020 - December 2020",
    icon: ddIcon,
    bullets: [
      "Built an internal CLI tool aimed at automating generation of CloudFormation templates utilized for deploying AWS cloud resources efficiently",
      "Engaged in feature development with frontend team on multiple Angular projects, contributing to the creation of various components with Bootstrap for enhanced user experience",
      "Developed reusable web components in VanillaJS tailored to meet client requirements, ensuring compatibility and versatility across different application frameworks",
    ],
    tags: ["AWS", "CLI", "Angular"],
  },
  {
    title: "Technical Writer",
    organization: "Smartprix Pvt. Ltd",
    location: "Noida, Uttar Pradesh",
    period: "Sep 2018 - Jan 2019",
    icon: smartprixIcon,
    bullets: [
      "Covered the latest happenings and trends in the Tech Industry through news articles",
      "Provided detailed reviews about the latest Tech products to help users make a purchase decision",
      `Links to a few blogs: \n 1. "https://www.smartprix.com/bytes/what-is-5g-here-is-what-to-expect-from-the-next-decade-of-wireless-communication/"> \n 2. https://www.smartprix.com/bytes/wifi-6-everything-you-should-know/ \n 3. https://www.smartprix.com/bytes/top-10-noise-cancelling-wireless-headphones-available-in-the-market/ \n`,
    ],
    tags: ["Writing", "Reviews", "Research"],
  },
];

function Experience() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);

  const scrollToIndex = (idx: number) => {
    const container = containerRef.current;
    if (!container) return;
    const targetTop = idx * window.innerHeight;
    container.scrollTo({ top: targetTop, behavior: "smooth" });
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.intersectionRatio >= 0.95);
      },
      { threshold: [0, 0.95, 1] },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const idx = Math.round(container.scrollTop / window.innerHeight);
      setCurrentIndex(Math.min(Math.max(idx, 0), JOBS.length - 1));
    };

    const onWheel = (e: WheelEvent) => {
      // If scrolling down at the last slide
      if (currentIndex === JOBS.length - 1 && e.deltaY > 0) {
        const isAtBottom =
          container.scrollHeight - container.scrollTop <=
          container.clientHeight + 10;

        if (isAtBottom) {
          // Don't prevent default - let it scroll the main page
          // Disable the experience scroll container
          container.style.overflowY = "hidden";
          setIsInView(false);

          // Re-enable after the scroll completes
          setTimeout(() => {
            const nextSection = sectionRef.current?.nextElementSibling;
            if (nextSection) {
              nextSection.scrollIntoView({ behavior: "smooth" });
            }
          }, 50);
        }
      }

      // If scrolling up at the first slide
      if (currentIndex === 0 && e.deltaY < 0) {
        const isAtTop = container.scrollTop <= 10;

        if (isAtTop) {
          // Don't prevent default - let it scroll the main page
          // Disable the experience scroll container
          container.style.overflowY = "hidden";
          setIsInView(false);

          // Re-enable after the scroll completes
          setTimeout(() => {
            const prevSection = sectionRef.current?.previousElementSibling;
            if (prevSection) {
              prevSection.scrollIntoView({ behavior: "smooth" });
            }
          }, 50);
        }
      }
    };

    container.addEventListener("scroll", onScroll, { passive: true });
    container.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      container.removeEventListener("scroll", onScroll);
      container.removeEventListener("wheel", onWheel);
    };
  }, [currentIndex]);

  const getYear = (period: string) => {
    const match = period.match(/\b(\d{4})\b/);
    return match ? match[1] : period;
  };

  return (
    <div id="experience" className="section experienceSection" ref={sectionRef}>
      <div
        className="experienceFull"
        ref={containerRef}
        style={{
          overflowY: isInView ? "scroll" : "hidden",
          pointerEvents: isInView ? "auto" : "none",
        }}
      >
        {/* Progress dots with active year badge */}
        <div className="experienceDots">
          {JOBS.map((job, i) => (
            <div key={i} className="dotRow">
              {i === currentIndex ? (
                <button className="yearPill" onClick={() => scrollToIndex(i)}>
                  <span className="yearText">{getYear(job.period)}</span>
                </button>
              ) : (
                <Tooltip title={job.title} placement="left">
                  <IconButton
                    size="small"
                    onClick={() => scrollToIndex(i)}
                    className="dot"
                  >
                    <CircleIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              )}
            </div>
          ))}
        </div>

        {JOBS.map((job, index) => (
          <section className="experienceSlide" key={`${job.title}-${index}`}>
            <Paper
              elevation={8}
              className={`experienceSlideCard ${
                currentIndex === index
                  ? "active"
                  : index < currentIndex
                    ? "previous"
                    : "next"
              }`}
            >
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                className="experienceHeader"
              >
                <Avatar
                  src={job.icon}
                  alt={job.organization}
                  className="experienceAvatar"
                />
                <Box>
                  <Typography variant="h4" className="experienceTitle">
                    {job.title}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {job.organization}
                  </Typography>
                </Box>
              </Stack>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                className={`experienceLocation ${currentIndex === index ? "visible" : "hidden"}`}
              >
                {job.location} • {job.period}
              </Typography>
              {job.bullets && (
                <ul
                  className={
                    currentIndex === index
                      ? "experienceBullets visible"
                      : "experienceBullets"
                  }
                >
                  {job.bullets.map((b, i) => (
                    <li key={i}>
                      <Typography variant="body1">{b}</Typography>
                    </li>
                  ))}
                </ul>
              )}
              {job.tags && job.tags.length ? (
                <Stack
                  direction="row"
                  spacing={1}
                  className={`experienceTags ${currentIndex === index ? "visible" : "hidden"}`}
                >
                  {job.tags.map((t) => (
                    <Chip key={t} label={t} size="small" />
                  ))}
                </Stack>
              ) : null}
            </Paper>
          </section>
        ))}
        {/* Buffer section to allow scrolling out */}
        <section
          className="experienceSlide"
          style={{ height: "10vh", scrollSnapAlign: "end" }}
        />
      </div>
    </div>
  );
}

export default Experience;

import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  TextField,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SendIcon from "@mui/icons-material/Send";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    try {
      const form = e.target as HTMLFormElement;
      const formDataObj = new FormData(form);

      const response = await fetch(
        "https://formsubmit.co/68940ffd0dadda96d449f53a3c233d38",
        {
          method: "POST",
          body: formDataObj,
          headers: {
            Accept: "application/json",
          },
        },
      );

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("FormSubmit Error:", error);
      setStatus({
        type: "error",
        message: "Failed to send message. Please try emailing me directly.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <div id="contact" className="section contactSection">
      <Paper className="contactContainer sectionContainer" elevation={8}>
        <Box className="sectionHeader">
          <Typography variant="h6" className="sectionHeading">
            Get In Touch
          </Typography>
        </Box>

        <Box className="contactLayout">
          {/* Left Side - Contact Info */}
          <Box className="contactIntro">
            <Typography variant="h4" className="contactTitle">
              Let's Connect
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className="contactDescription"
            >
              I'm always open to discussing new opportunities, collaborations,
              or just having a chat about tech and photography. Feel free to
              reach out!
            </Typography>

            <Stack spacing={2} className="contactLinks">
              {/* Email */}
              <Box
                component="a"
                href="mailto:ssiddula.jobs@gmail.com"
                className="contactCard"
              >
                <Box className="contactCardIcon">
                  <EmailIcon />
                </Box>
                <Box className="contactCardInfo">
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    className="contactCardLabel"
                  >
                    Email
                  </Typography>
                  <Typography variant="body2" className="contactCardValue">
                    ssiddula.jobs@gmail.com
                  </Typography>
                </Box>
              </Box>

              {/* LinkedIn */}
              <Box
                component="a"
                href="https://linkedin.com/in/sreekarsiddula"
                target="_blank"
                rel="noopener noreferrer"
                className="contactCard"
              >
                <Box className="contactCardIcon">
                  <LinkedInIcon />
                </Box>
                <Box className="contactCardInfo">
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    className="contactCardLabel"
                  >
                    LinkedIn
                  </Typography>
                  <Typography variant="body2" className="contactCardValue">
                    sreekarsiddula
                  </Typography>
                </Box>
              </Box>

              {/* GitHub */}
              <Box
                component="a"
                href="https://github.com/sreekar-ss"
                target="_blank"
                rel="noopener noreferrer"
                className="contactCard"
              >
                <Box className="contactCardIcon">
                  <GitHubIcon />
                </Box>
                <Box className="contactCardInfo">
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    className="contactCardLabel"
                  >
                    GitHub
                  </Typography>
                  <Typography variant="body2" className="contactCardValue">
                    sreekar-ss
                  </Typography>
                </Box>
              </Box>

              {/* Location */}
              <Box className="contactCard">
                <Box className="contactCardIcon">
                  <LocationOnIcon />
                </Box>
                <Box className="contactCardInfo">
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    className="contactCardLabel"
                  >
                    Location
                  </Typography>
                  <Typography variant="body2" className="contactCardValue">
                    Boston, MA, USA
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Box>

          {/* Right Side - Contact Form */}
          <Paper elevation={4} className="contactFormContainer">
            <Typography variant="h5" className="contactFormTitle">
              Send a Message
            </Typography>

            <form onSubmit={handleSubmit} className="contactForm">
              <Stack spacing={2}>
                {status && (
                  <Alert
                    severity={status.type}
                    onClose={() => setStatus(null)}
                    className="contactAlert"
                  >
                    {status.message}
                  </Alert>
                )}

                {/* Hidden fields for FormSubmit configuration */}
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="box" />

                <Box className="contactFormGroup">
                  <Typography variant="body2" className="contactFormLabel">
                    Name
                  </Typography>
                  <TextField
                    name="name"
                    fullWidth
                    placeholder="Your full name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="contactFormField"
                  />
                </Box>

                <Box className="contactFormGroup">
                  <Typography variant="body2" className="contactFormLabel">
                    Email
                  </Typography>
                  <TextField
                    name="email"
                    fullWidth
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="contactFormField"
                  />
                </Box>

                <Box className="contactFormGroup">
                  <Typography variant="body2" className="contactFormLabel">
                    Subject
                  </Typography>
                  <TextField
                    name="_subject"
                    fullWidth
                    placeholder="What's this about?"
                    required
                    value={formData.subject}
                    onChange={(e) =>
                      setFormData({ ...formData, subject: e.target.value })
                    }
                    className="contactFormField"
                  />
                </Box>

                <Box className="contactFormGroup">
                  <Typography variant="body2" className="contactFormLabel">
                    Message
                  </Typography>
                  <TextField
                    name="message"
                    fullWidth
                    multiline
                    rows={4}
                    placeholder="Tell me about your project or question..."
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="contactFormField"
                  />
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  endIcon={
                    sending ? (
                      <CircularProgress size={20} sx={{ color: "white" }} />
                    ) : (
                      <SendIcon />
                    )
                  }
                  fullWidth
                  disabled={sending}
                  className="contactSubmitButton"
                >
                  {sending ? "Sending..." : "Send Message"}
                </Button>
              </Stack>
            </form>
          </Paper>
        </Box>

        <Divider className="contactDivider" />

        {/* Footer */}
        <Typography
          variant="body2"
          color="text.secondary"
          className="contactFooter"
        >
          © {new Date().getFullYear()} Sreekar Siddula. Built with React & ❤️
        </Typography>
      </Paper>
    </div>
  );
}

export default Contact;

import React, { useState } from "react";
import { Box, Paper, Typography, Button, Stack, TextField, Divider, Alert, CircularProgress } from "@mui/material";
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
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    try {
      const form = e.target as HTMLFormElement;
      const formDataObj = new FormData(form);

      const response = await fetch('https://formsubmit.co/68940ffd0dadda96d449f53a3c233d38', {
        method: 'POST',
        body: formDataObj,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon.' });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('FormSubmit Error:', error);
      setStatus({ type: 'error', message: 'Failed to send message. Please try emailing me directly.' });
    } finally {
      setSending(false);
    }
  };

  return (
    <div id="contact" className="section contactSection">
      <Paper className="contactContainer sectionContainer" elevation={8}>
        <Box className="sectionHeader" sx={{ mb: 3, p: 2, borderRadius: "8px", textAlign: "center" }}>
          <Typography variant="h6" className="sectionHeading">
            Get In Touch
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1.2fr" },
            gap: 3,
            px: 3,
            pb: 3,
          }}
        >
          {/* Left Side - Contact Info */}
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1.5 }}>
              Let's Connect
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.6, color: "text.secondary" }}>
              I'm always open to discussing new opportunities, collaborations, or just having a 
              chat about tech and photography. Feel free to reach out!
            </Typography>

            <Stack spacing={2}>
              {/* Email */}
              <Box
                component="a"
                href="mailto:ssiddula.jobs@gmail.com"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 1.5,
                  backgroundColor: "rgba(110, 231, 242, 0.05)",
                  borderRadius: "8px",
                  border: "1px solid rgba(110, 231, 242, 0.2)",
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                  transition: "all 300ms ease",
                  "&:hover": {
                    backgroundColor: "rgba(110, 231, 242, 0.15)",
                    borderColor: "var(--accent-color)",
                    transform: "translateX(8px)",
                    boxShadow: "0 4px 12px rgba(110, 231, 242, 0.2)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "8px",
                    backgroundColor: "var(--accent-color)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <EmailIcon sx={{ color: "white", fontSize: "1.2rem" }} />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                    Email
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
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
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 1.5,
                  backgroundColor: "rgba(110, 231, 242, 0.05)",
                  borderRadius: "8px",
                  border: "1px solid rgba(110, 231, 242, 0.2)",
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                  transition: "all 300ms ease",
                  "&:hover": {
                    backgroundColor: "rgba(110, 231, 242, 0.15)",
                    borderColor: "var(--accent-color)",
                    transform: "translateX(8px)",
                    boxShadow: "0 4px 12px rgba(110, 231, 242, 0.2)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "8px",
                    backgroundColor: "var(--accent-color)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LinkedInIcon sx={{ color: "white", fontSize: "1.2rem" }} />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                    LinkedIn
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
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
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 1.5,
                  backgroundColor: "rgba(110, 231, 242, 0.05)",
                  borderRadius: "8px",
                  border: "1px solid rgba(110, 231, 242, 0.2)",
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                  transition: "all 300ms ease",
                  "&:hover": {
                    backgroundColor: "rgba(110, 231, 242, 0.15)",
                    borderColor: "var(--accent-color)",
                    transform: "translateX(8px)",
                    boxShadow: "0 4px 12px rgba(110, 231, 242, 0.2)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "8px",
                    backgroundColor: "var(--accent-color)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <GitHubIcon sx={{ color: "white", fontSize: "1.2rem" }} />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                    GitHub
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    sreekar-ss
                  </Typography>
                </Box>
              </Box>

              {/* Location */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 1.5,
                  backgroundColor: "rgba(110, 231, 242, 0.05)",
                  borderRadius: "8px",
                  border: "1px solid rgba(110, 231, 242, 0.2)",
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "8px",
                    backgroundColor: "var(--accent-color)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <LocationOnIcon sx={{ color: "white", fontSize: "1.2rem" }} />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                    Location
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    Boston, MA, USA
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Box>

          {/* Right Side - Contact Form */}
          <Paper
            elevation={4}
            sx={{
              p: 2.5,
              backgroundColor: "rgba(110, 231, 242, 0.03)",
              border: "1px solid rgba(110, 231, 242, 0.2)",
              borderRadius: "12px",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              Send a Message
            </Typography>

            <form onSubmit={handleSubmit}>
              <Stack spacing={2}>
                {status && (
                  <Alert 
                    severity={status.type}
                    onClose={() => setStatus(null)}
                    sx={{ borderRadius: "8px" }}
                  >
                    {status.message}
                  </Alert>
                )}
                
                {/* Hidden fields for FormSubmit configuration */}
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="box" />
                
                <Box>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                    Name
                  </Typography>
                  <TextField
                    name="name"
                    fullWidth
                    placeholder="Your full name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "var(--secondary-color)",
                        "&:hover fieldset": {
                          borderColor: "var(--accent-color)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--accent-color)",
                        },
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                    Email
                  </Typography>
                  <TextField
                    name="email"
                    fullWidth
                    type="email"
                    placeholder="your.email@example.com"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "var(--secondary-color)",
                        "&:hover fieldset": {
                          borderColor: "var(--accent-color)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--accent-color)",
                        },
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
                    Subject
                  </Typography>
                  <TextField
                    name="_subject"
                    fullWidth
                    placeholder="What's this about?"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "var(--secondary-color)",
                        "&:hover fieldset": {
                          borderColor: "var(--accent-color)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--accent-color)",
                        },
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
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
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "var(--secondary-color)",
                        "&:hover fieldset": {
                          borderColor: "var(--accent-color)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--accent-color)",
                        },
                      },
                    }}
                  />
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  endIcon={sending ? <CircularProgress size={20} sx={{ color: "white" }} /> : <SendIcon />}
                  fullWidth
                  disabled={sending}
                  sx={{
                    py: 1.2,
                    background: "linear-gradient(45deg, var(--accent-color), var(--accent-secondary))",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "0.95rem",
                    textTransform: "none",
                    "&:hover": {
                      filter: "brightness(1.15)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 6px 20px rgba(110, 231, 242, 0.3)",
                    },
                    "&:disabled": {
                      background: "linear-gradient(45deg, var(--accent-color), var(--accent-secondary))",
                      opacity: 0.7,
                      color: "white",
                    },
                    transition: "all 300ms ease",
                  }}
                >
                  {sending ? 'Sending...' : 'Send Message'}
                </Button>
              </Stack>
            </form>
          </Paper>
        </Box>

        <Divider sx={{ mt: 3, borderColor: "rgba(255,255,255,0.1)" }} />

        {/* Footer */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 2, mb: 2, textAlign: "center" }}
        >
          © {new Date().getFullYear()} Sreekar Siddula. Built with React & ❤️
        </Typography>
      </Paper>
    </div>
  );
}

export default Contact;


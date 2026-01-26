import {
  Document,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import type { ResumeType } from "@/app/schemas/ResumeSchema";

// Create styles for sidebar template
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontFamily: "Helvetica",
    fontSize: 10,
    lineHeight: 1.4,
  },
  sidebar: {
    width: "30%",
    backgroundColor: "#1a2a3a",
    color: "#ffffff",
    padding: 20,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  mainContent: {
    width: "70%",
    backgroundColor: "#ffffff",
    color: "#000000",
    padding: 20,
  },
  name: {
    fontSize: 20,
    marginBottom: 8,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
  },
  contactItem: {
    marginBottom: 4,
    fontSize: 9,
    color: "#e0e0e0",
  },
  link: {
    color: "#4fc3f7",
    textDecoration: "none",
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    borderBottomWidth: 1,
    borderBottomColor: "#666666",
    marginBottom: 8,
    marginTop: 16,
    paddingBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  sidebarSectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    borderBottomWidth: 1,
    borderBottomColor: "#666666",
    marginBottom: 8,
    marginTop: 16,
    paddingBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#ffffff",
  },
  skillItem: {
    marginBottom: 3,
    fontSize: 9,
    color: "#e0e0e0",
  },
  section: {
    marginBottom: -10,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 4,
  },
  itemTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
  },
  itemSubtitle: {
    fontFamily: "Helvetica-Oblique",
    fontSize: 9,
    color: "#555555",
  },
  itemDate: {
    fontSize: 9,
    color: "#555555",
  },
  paragraph: {
    marginBottom: 6,
    fontSize: 9,
    textAlign: "justify",
    color: "#333333",
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 8,
  },
  bulletDot: {
    width: 8,
    fontSize: 8,
  },
  bulletContent: {
    flex: 1,
    fontSize: 9,
    color: "#333333",
  },
  techTag: {
    backgroundColor: "#f0f0f0",
    padding: 2,
    marginRight: 4,
    marginBottom: 2,
    fontSize: 8,
    borderRadius: 2,
    color: "#555555",
  },
});

export const SidebarTemplatePdf = ({ data }: { data: ResumeType }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Sidebar */}
        <View style={styles.sidebar}>
          {/* Name */}
          {data.personalInfo && (
            <View>
              <Text style={styles.name}>
                {data.personalInfo.fullName || "Your Name"}
              </Text>

              {/* Contact Information */}
              <View style={{ marginTop: 16 }}>
                {data.personalInfo.email && (
                  <Text style={styles.contactItem}>
                    {data.personalInfo.email}
                  </Text>
                )}
                {data.personalInfo.phone && (
                  <Text style={styles.contactItem}>
                    {data.personalInfo.phone}
                  </Text>
                )}
                {data.personalInfo.address && (
                  <Text style={styles.contactItem}>
                    {data.personalInfo.address}
                  </Text>
                )}
                {data.personalInfo.linkedin && (
                  <Text style={styles.contactItem}>
                    in{" "}
                    <Link src={data.personalInfo.linkedin} style={styles.link}>
                      LinkedIn
                    </Link>
                  </Text>
                )}
                {data.personalInfo.github && (
                  <Text style={styles.contactItem}>
                    gh{" "}
                    <Link src={data.personalInfo.github} style={styles.link}>
                      GitHub
                    </Link>
                  </Text>
                )}
                {data.personalInfo.portfolio && (
                  <Text style={styles.contactItem}>
                    <Link src={data.personalInfo.portfolio} style={styles.link}>
                      Portfolio
                    </Link>
                  </Text>
                )}
              </View>
            </View>
          )}

          {/* Skills Section */}
          {data.skills && data.skills.length > 0 && (
            <View>
              <Text style={styles.sidebarSectionTitle}>Skills</Text>
              {data.skills.map((skill, index) => (
                <Text
                  // biome-ignore lint/suspicious/noArrayIndexKey: skills are simple strings
                  key={`skill-${index}`}
                  style={styles.skillItem}
                >
                  • {skill}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Summary */}
          {data.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Profile</Text>
              <Text style={styles.paragraph}>{data.summary}</Text>
            </View>
          )}

          {/* Experience */}
          {data.experience && data.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Experience</Text>
              {data.experience.map((exp, index) => (
                <View
                  key={exp.id || `exp-${index}`}
                  style={{ marginBottom: 5 }}
                >
                  <View style={styles.itemHeader}>
                    <View>
                      <Text style={styles.itemTitle}>{exp.company}</Text>
                      <Text style={styles.itemSubtitle}>{exp.role}</Text>
                    </View>
                    <Text style={styles.itemDate}>
                      {exp.startDate} – {exp.endDate || "Present"}
                    </Text>
                  </View>
                  <View style={{ marginTop: 3 }}>
                    {(Array.isArray(exp.description)
                      ? exp.description
                      : exp.description
                        ? [exp.description]
                        : []
                    ).map((line, i) => (
                      <View
                        // biome-ignore lint/suspicious/noArrayIndexKey: description points are simple strings
                        key={`line-${i}`}
                        style={styles.bulletPoint}
                      >
                        <Text style={styles.bulletDot}>•</Text>
                        <Text style={styles.bulletContent}>{line}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {data.education && data.education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {data.education.map((edu, index) => (
                <View
                  key={edu.id || `edu-${index}`}
                  style={{ marginBottom: 8 }}
                >
                  <View style={styles.itemHeader}>
                    <View>
                      <Text style={styles.itemTitle}>{edu.institution}</Text>
                      <Text style={styles.itemSubtitle}>{edu.degree}</Text>
                    </View>
                    <Text style={styles.itemDate}>
                      {edu.startDate} - {edu.endDate}
                    </Text>
                  </View>
                  {edu.grade && (
                    <Text style={{ fontSize: 9, color: "#555555" }}>
                      GPA: {edu.grade}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {data.projects.map((project, index) => (
                <View
                  key={project.id || `project-${index}`}
                  style={{ marginBottom: 8 }}
                >
                  <Text style={styles.itemTitle}>{project.name}</Text>
                  <Text style={styles.paragraph}>{project.description}</Text>
                  {project.tech && project.tech.length > 0 && (
                    <View
                      style={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        marginTop: 4,
                      }}
                    >
                      {project.tech.map((tech, i) => (
                        <Text
                          // biome-ignore lint/suspicious/noArrayIndexKey: tech items are simple strings
                          key={`tech-${i}`}
                          style={styles.techTag}
                        >
                          {tech}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};

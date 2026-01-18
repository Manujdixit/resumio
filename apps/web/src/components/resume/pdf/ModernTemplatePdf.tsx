import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import type { ResumeType } from "@/app/schemas/ResumeSchema";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Times-Roman",
    fontSize: 11,
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
  },
  name: {
    fontSize: 24,
    marginBottom: 10,
    fontFamily: "Times-Bold",
  },
  contactRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    fontSize: 10,
    flexWrap: "wrap",
  },
  linksRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    fontSize: 10,
    marginTop: 2,
    flexWrap: "wrap",
  },
  link: {
    color: "#2563eb", // text-blue-600
    textDecoration: "none",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Times-Bold",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginBottom: 8,
    paddingBottom: 2,
  },
  paragraph: {
    marginBottom: 5,
    textAlign: "justify",
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 2,
  },
  itemTitle: {
    fontFamily: "Times-Bold",
  },
  itemSubtitle: {
    fontFamily: "Times-Italic",
    fontSize: 10,
  },
  itemDate: {
    fontSize: 10,
  },
  skillGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  skillItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "30%", // roughly grid-cols-3 or so
    marginBottom: 4,
  },
  bullet: {
    marginRight: 5,
  },
  projectTech: {
    flexDirection: "row",
    flexWrap: "wrap",
    fontSize: 10,
    marginTop: 2,
  },
  techLabel: {
    fontFamily: "Times-Bold",
    marginRight: 4,
  },
  techItem: {
    marginRight: 2,
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 2,
    paddingLeft: 5,
  },
  bulletDot: {
    width: 10,
    fontSize: 10,
  },
  bulletContent: {
    flex: 1,
  },
});

export const ModernTemplatePdf = ({ data }: { data: ResumeType }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        {data.personalInfo && (
          <View style={styles.header}>
            <Text style={styles.name}>
              {data.personalInfo.fullName || "Your Name"}
            </Text>

            <View style={styles.contactRow}>
              {data.personalInfo.email && (
                <Text>{data.personalInfo.email}</Text>
              )}
              {data.personalInfo.phone && (
                <Text>{data.personalInfo.phone}</Text>
              )}
              {data.personalInfo.address && (
                <Text>{data.personalInfo.address}</Text>
              )}
            </View>

            {(data.personalInfo.linkedin ||
              data.personalInfo.github ||
              data.personalInfo.portfolio) && (
              <View style={styles.linksRow}>
                {data.personalInfo.linkedin && (
                  <Link src={data.personalInfo.linkedin} style={styles.link}>
                    LinkedIn
                  </Link>
                )}
                {data.personalInfo.github && (
                  <Link src={data.personalInfo.github} style={styles.link}>
                    GitHub
                  </Link>
                )}
                {data.personalInfo.portfolio && (
                  <Link src={data.personalInfo.portfolio} style={styles.link}>
                    Portfolio
                  </Link>
                )}
              </View>
            )}
          </View>
        )}

        {/* Summary */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.paragraph}>{data.summary}</Text>
          </View>
        )}

        {/* Education */}
        {data.education && data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {data.education.map((edu, index) => (
              <View key={index} style={{ marginBottom: 8 }}>
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
                  <Text style={{ fontSize: 10 }}>GPA: {edu.grade}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Technical Skills */}
        {data.skills && data.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            <Text>{data.skills.join(", ")}</Text>
          </View>
        )}

        {/* Professional Experience */}
        {data.experience && data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Professional Experience</Text>
            {data.experience.map((exp, index) => (
              <View key={index} style={{ marginBottom: 10 }}>
                <View style={styles.itemHeader}>
                  <View>
                    <Text style={styles.itemTitle}>{exp.company}</Text>
                    <Text style={styles.itemSubtitle}>{exp.role}</Text>
                  </View>
                  <Text style={styles.itemDate}>
                    {exp.startDate} - {exp.endDate || "present"}
                  </Text>
                </View>
                <View style={{ marginTop: 2 }}>
                  {exp.description.split("\n").map((line, i) => (
                    <View key={i} style={styles.bulletPoint}>
                      <Text style={styles.bulletDot}>•</Text>
                      <Text style={styles.bulletContent}>{line}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {data.projects && data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((project, index) => (
              <View key={index} style={{ marginBottom: 8 }}>
                <Text style={styles.itemTitle}>{project.name}</Text>
                <Text style={styles.paragraph}>{project.description}</Text>
                {project.tech && project.tech.length > 0 && (
                  <View style={styles.projectTech}>
                    <Text style={styles.techLabel}>Technologies:</Text>
                    {project.tech.map((tech, techIndex) => (
                      <Text key={techIndex} style={styles.techItem}>
                        {tech}
                        {techIndex < project.tech.length - 1 ? "," : ""}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

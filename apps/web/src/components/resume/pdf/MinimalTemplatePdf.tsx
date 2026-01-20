import {
	Document,
	Link,
	Page,
	StyleSheet,
	Text,
	View,
} from "@react-pdf/renderer";
import type { ResumeType } from "@/app/schemas/ResumeSchema";

// Create styles for minimal template
const styles = StyleSheet.create({
	page: {
		padding: 30,
		fontFamily: "Times-Roman",
		fontSize: 11,
		lineHeight: 1.5,
		backgroundColor: "#f5f5f0",
		color: "#333333",
	},
	header: {
		marginBottom: 24,
	},
	name: {
		fontSize: 24,
		marginBottom: 8,
		fontFamily: "Times-Bold",
		color: "#4a4a4a",
	},
	contactRow: {
		flexDirection: "row",
		gap: 12,
		fontSize: 10,
		color: "#666666",
		flexWrap: "wrap",
		marginBottom: 4,
	},
	linksRow: {
		flexDirection: "row",
		gap: 12,
		fontSize: 10,
		color: "#666666",
		flexWrap: "wrap",
	},
	link: {
		color: "#2563eb",
		textDecoration: "none",
	},
	section: {
		marginBottom: 20,
	},
	sectionTitle: {
		fontSize: 14,
		fontFamily: "Times-Bold",
		textAlign: "center",
		borderBottomWidth: 1,
		borderBottomColor: "#dddddd",
		marginBottom: 12,
		paddingBottom: 6,
		backgroundColor: "#e8e8e8",
		color: "#4a4a4a",
		textTransform: "uppercase",
		letterSpacing: 2,
	},
	paragraph: {
		marginBottom: 6,
		textAlign: "justify",
		fontSize: 10,
	},
	itemHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: 6,
	},
	itemDateColumn: {
		width: "25%",
		fontSize: 10,
		color: "#4a4a4a",
		fontFamily: "Times-Bold",
	},
	itemContentColumn: {
		width: "75%",
		paddingLeft: 8,
	},
	itemTitle: {
		fontFamily: "Times-Bold",
		fontSize: 12,
		color: "#2c3e50",
		marginBottom: 2,
	},
	itemSubtitle: {
		fontFamily: "Times-Italic",
		fontSize: 10,
		color: "#555555",
		marginBottom: 4,
	},
	educationTitle: {
		fontFamily: "Times-Bold",
		fontSize: 12,
		color: "#2c3e50",
		marginBottom: 2,
	},
	educationSubtitle: {
		fontSize: 10,
		color: "#555555",
		marginBottom: 2,
	},
	bulletPoint: {
		flexDirection: "row",
		marginBottom: 2,
		paddingLeft: 8,
	},
	bulletDot: {
		width: 10,
		fontSize: 10,
		color: "#888888",
	},
	bulletContent: {
		flex: 1,
		fontSize: 10,
		color: "#444444",
	},
	skillsContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
		gap: 16,
	},
	skillItem: {
		flexDirection: "row",
		alignItems: "center",
		fontSize: 10,
		color: "#444444",
	},
	skillBullet: {
		marginRight: 6,
		color: "#888888",
	},
	projectTech: {
		flexDirection: "row",
		flexWrap: "wrap",
		fontSize: 10,
		marginTop: 4,
		color: "#555555",
	},
	techLabel: {
		fontFamily: "Times-Bold",
		marginRight: 6,
	},
});

export const MinimalTemplatePdf = ({ data }: { data: ResumeType }) => {
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
						<Text style={styles.sectionTitle}>Profile</Text>
						<Text style={styles.paragraph}>{data.summary}</Text>
					</View>
				)}

				{/* Experience */}
				{data.experience && data.experience.length > 0 && (
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Work Experience</Text>
						{data.experience.map((exp, index) => (
							<View key={index} style={{ marginBottom: 12 }}>
								<View style={styles.itemHeader}>
									<View style={styles.itemDateColumn}>
										<Text>{exp.startDate} –</Text>
										<Text>{exp.endDate || "Present"}</Text>
									</View>
									<View style={styles.itemContentColumn}>
										<Text style={styles.itemTitle}>{exp.company}</Text>
										<Text style={styles.itemSubtitle}>{exp.role}</Text>
										<View style={{ marginTop: 4 }}>
											{exp.description.split("\n").map((line, i) => (
												<View key={i} style={styles.bulletPoint}>
													<Text style={styles.bulletDot}>•</Text>
													<Text style={styles.bulletContent}>{line}</Text>
												</View>
											))}
										</View>
									</View>
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
							<View key={index} style={{ marginBottom: 8 }}>
								<View style={styles.itemHeader}>
									<View style={styles.itemDateColumn}>
										<Text>
											{edu.startDate} – {edu.endDate}
										</Text>
									</View>
									<View style={styles.itemContentColumn}>
										<Text style={styles.educationTitle}>{edu.degree}</Text>
										<Text style={styles.educationSubtitle}>
											{edu.institution}
										</Text>
										{edu.grade && (
											<Text style={{ fontSize: 10, color: "#555555" }}>
												GPA: {edu.grade}
											</Text>
										)}
									</View>
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
										<Text style={styles.techLabel}>Tech:</Text>
										<Text>{project.tech.join(", ")}</Text>
									</View>
								)}
							</View>
						))}
					</View>
				)}

				{/* Skills */}
				{data.skills && data.skills.length > 0 && (
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Skills</Text>
						<View style={styles.skillsContainer}>
							{data.skills.map((skill, index) => (
								<View key={index} style={styles.skillItem}>
									<Text style={styles.skillBullet}>•</Text>
									<Text>{skill}</Text>
								</View>
							))}
						</View>
					</View>
				)}
			</Page>
		</Document>
	);
};

import { z } from "zod";

const PersonalInfoSchema = z.object({
    fullName: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    portfolio: z.string().optional(),
});

const summarySchema = z.string();

const experienceSchema = z.array(
    z.object({
        company: z.string(),
        role: z.string(),
        startDate: z.string(),
        endDate: z.string().optional(),
        description: z.string(),
    })
);

const educationSchema = z.array(
    z.object({
        institution: z.string(),
        degree: z.string(),
        startDate: z.string(),
        endDate: z.string(),
        grade: z.string().optional(),
    })
);

const skillsSchema = z.array(z.string());

const projectsSchema = z.array(
    z.object({
        name: z.string(),
        description: z.string(),
        tech: z.array(z.string()),
    })
);

export const ResumeSchema = z.object({
    personalInfo: PersonalInfoSchema.optional(),
    summary: summarySchema.optional(),
    experience: experienceSchema.optional(),
    education: educationSchema.optional(),
    skills: skillsSchema.optional(),
    projects: projectsSchema.optional(),
});

export type ResumeType = z.infer<typeof ResumeSchema>;

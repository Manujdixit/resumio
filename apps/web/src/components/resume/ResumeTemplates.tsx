import type { ResumeType } from "@/app/schemas/ResumeSchema";

export const ModernTemplate = ({ data }: { data: ResumeType }) => {
  return (
    <div
      className="resume-paper relative mx-auto min-h-[297mm] max-w-[210mm] bg-white p-12 text-black shadow-lg"
      style={{
        fontFamily: "Georgia, serif",
      }}
    >
      {/* Page 1 Marker */}
      <div className="no-print pointer-events-none absolute top-2 right-4 font-sans text-gray-300 text-xs">
        Page 1
      </div>

      {/* Page Break Indicators */}
      {/* {[1, 2, 3].map((page) => (
        <div
          key={page}
          className="absolute left-0 right-0 flex flex-col items-center justify-center pointer-events-none no-print"
          style={{
            top: `${page * 297}mm`,
            height: "20px",
            transform: "translateY(-50%)",
          }}
        >
        
          <div className="w-full h-[2px] bg-gray-300 border-dashed border-gray-400" />
          <div className="bg-gray-100 px-2 text-xs text-gray-500 font-sans -mt-2">
            End of Page {page} • Start of Page {page + 1}
          </div>
        </div>
      ))} */}

      {/* Header with Name and Contact */}
      {data.personalInfo && (
        <div className="mb-6 text-center">
          <h1 className="mb-2 font-bold text-3xl">
            {data.personalInfo.fullName || "Your Name"}
          </h1>
          <div className="flex items-center justify-center gap-3 text-sm">
            {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
            {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
            {data.personalInfo.address && (
              <span>{data.personalInfo.address}</span>
            )}
          </div>
          {(data.personalInfo.linkedin ||
            data.personalInfo.github ||
            data.personalInfo.portfolio) && (
            <div className="mt-1 flex items-center justify-center gap-3 text-sm">
              {data.personalInfo.linkedin && (
                <a
                  href={data.personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  LinkedIn
                </a>
              )}
              {data.personalInfo.github && (
                <a
                  href={data.personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  GitHub
                </a>
              )}
              {data.personalInfo.portfolio && (
                <a
                  href={data.personalInfo.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Portfolio
                </a>
              )}
            </div>
          )}
        </div>
      )}

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <h2 className="mb-3 border-black border-b-2 pb-1 font-bold text-lg">
            Summary
          </h2>
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-3 border-black border-b-2 pb-1 font-bold text-lg">
            Education
          </h2>
          {data.education.map((edu, index) => (
            <div key={edu.id || `edu-${index}`} className="mb-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="font-bold">{edu.institution}</p>
                  <p className="text-sm italic">{edu.degree}</p>
                </div>
                <p className="text-sm">
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
              {edu.grade && <p className="mt-1 text-sm">GPA: {edu.grade}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Technical Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-3 border-black border-b-2 pb-1 font-bold text-lg">
            Technical Skills
          </h2>
          <div className="grid grid-cols-6 gap-x-4 gap-y-2 text-sm">
            {data.skills.map((skill, index) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: skills are simple strings
                key={`skill-${index}`}
                className="flex items-start"
              >
                <span className="mr-2">•</span>
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Professional Experience */}
      {data.experience && data.experience.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-3 border-black border-b-2 pb-1 font-bold text-lg">
            Professional Experience
          </h2>
          {data.experience.map((exp, index) => (
            <div key={exp.id || `exp-${index}`} className="mb-4">
              <div className="mb-1 flex items-baseline justify-between">
                <div>
                  <p className="font-bold">{exp.company}</p>
                  <p className="text-sm italic">{exp.role}</p>
                </div>
                <p className="text-sm">
                  {exp.startDate} - {exp.endDate || "present"}
                </p>
              </div>
              <div className="mt-2 text-sm">
                {(Array.isArray(exp.description)
                  ? exp.description
                  : exp.description
                    ? [exp.description]
                    : []
                ).map((line, i) => (
                  <div
                    // biome-ignore lint/suspicious/noArrayIndexKey: description points are simple strings
                    key={`line-${i}`}
                    className="mb-1 flex items-start"
                  >
                    <span className="mr-2">•</span>
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {data.projects && data.projects.length > 0 && (
        <div className="mb-6">
          <h2 className="mb-3 border-black border-b-2 pb-1 font-bold text-lg">
            Projects
          </h2>
          {data.projects.map((project, index) => (
            <div key={project.id || `project-${index}`} className="mb-4">
              <p className="font-bold">{project.name}</p>
              <p className="mt-1 text-sm">{project.description}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-sm">
                <span className="font-semibold">Technologies:</span>
                {project.tech.map((tech, techIndex) => (
                  <span
                    // biome-ignore lint/suspicious/noArrayIndexKey: tech items are simple strings
                    key={`tech-${techIndex}`}
                  >
                    {tech}
                    {techIndex < project.tech.length - 1 ? "," : ""}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const SidebarTemplate = ({ data }: { data: ResumeType }) => {
  return (
    <div
      className="resume-paper relative mx-auto flex min-h-[297mm] max-w-[210mm] bg-white text-black shadow-lg"
      style={{ fontFamily: "sans-serif" }}
    >
      {/* Sidebar */}
      <div className="flex w-1/3 flex-col gap-8 bg-[#1a2a3a] p-8 text-white">
        <div>
          <h1 className="mb-2 font-bold text-3xl leading-tight">
            {data.personalInfo?.fullName?.split(" ").map((name, i) => (
              <span
                // biome-ignore lint/suspicious/noArrayIndexKey: name parts are simple strings
                key={`name-${i}`}
                className="block"
              >
                {name}
              </span>
            )) || "Your Name"}
          </h1>
          <p className="mt-2 text-gray-300 text-lg">
            {/* Role placeholder - could be added to schema later */}
          </p>
        </div>

        <div className="space-y-4 text-sm">
          {data.personalInfo?.email && (
            <div className="flex items-center gap-2">
              <span className="break-all">{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo?.phone && (
            <div className="flex items-center gap-2">
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo?.address && (
            <div className="flex items-center gap-2">
              <span>{data.personalInfo.address}</span>
            </div>
          )}
          {data.personalInfo?.linkedin && (
            <div className="flex items-center gap-2">
              <span>in</span>
              <a
                href={data.personalInfo.linkedin}
                className="break-all hover:underline"
              >
                LinkedIn
              </a>
            </div>
          )}
          {data.personalInfo?.github && (
            <div className="flex items-center gap-2">
              <span>gh</span>
              <a
                href={data.personalInfo.github}
                className="break-all hover:underline"
              >
                GitHub
              </a>
            </div>
          )}
          {data.personalInfo?.portfolio && (
            <div className="flex items-center gap-2">
              <a
                href={data.personalInfo.portfolio}
                className="break-all hover:underline"
              >
                Portfolio
              </a>
            </div>
          )}
        </div>

        {data.skills && data.skills.length > 0 && (
          <div>
            <h3 className="mb-4 border-gray-600 border-b pb-2 font-bold text-lg uppercase tracking-wider">
              Skills
            </h3>
            <ul className="space-y-2 text-sm">
              {data.skills.map((skill, index) => (
                <li
                  // biome-ignore lint/suspicious/noArrayIndexKey: skills are simple strings
                  key={`skill-${index}`}
                >
                  • {skill}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 bg-white p-8">
        {data.summary && (
          <div className="mb-8">
            <h3 className="mb-4 flex items-center gap-2 border-gray-200 border-b-2 pb-2 font-bold text-lg uppercase tracking-wider">
              Profile
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              {data.summary}
            </p>
          </div>
        )}

        {data.experience && data.experience.length > 0 && (
          <div className="mb-8">
            <h3 className="mb-4 flex items-center gap-2 border-gray-200 border-b-2 pb-2 font-bold text-lg uppercase tracking-wider">
              Professional Experience
            </h3>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={exp.id || `exp-${index}`}>
                  <h4 className="font-bold text-gray-900">{exp.company}</h4>
                  <div className="mb-2 flex justify-between text-gray-600 text-sm">
                    <span className="italic">{exp.role}</span>
                    <span>
                      {exp.startDate} – {exp.endDate || "Present"}
                    </span>
                  </div>
                  <ul className="ml-4 list-outside list-disc space-y-1 text-gray-700 text-sm">
                    {(Array.isArray(exp.description)
                      ? exp.description
                      : exp.description
                        ? [exp.description]
                        : []
                    ).map((line, i) => (
                      <li
                        // biome-ignore lint/suspicious/noArrayIndexKey: description points are simple strings
                        key={`line-${i}`}
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.education && data.education.length > 0 && (
          <div className="mb-8">
            <h3 className="mb-4 flex items-center gap-2 border-gray-200 border-b-2 pb-2 font-bold text-lg uppercase tracking-wider">
              Education
            </h3>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={edu.id || `edu-${index}`}>
                  <h4 className="font-bold text-gray-900">{edu.institution}</h4>
                  <div className="text-gray-600 text-sm">
                    <div>{edu.degree}</div>
                    <div>
                      {edu.startDate} - {edu.endDate}
                    </div>
                    {edu.grade && <div>GPA: {edu.grade}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.projects && data.projects.length > 0 && (
          <div className="mb-8">
            <h3 className="mb-4 flex items-center gap-2 border-gray-200 border-b-2 pb-2 font-bold text-lg uppercase tracking-wider">
              Projects
            </h3>
            <div className="space-y-6">
              {data.projects.map((project, index) => (
                <div key={project.id || `project-${index}`}>
                  <h4 className="font-bold text-gray-900">{project.name}</h4>
                  <p className="mb-2 text-gray-700 text-sm">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    {project.tech.map((tech, i) => (
                      <span
                        // biome-ignore lint/suspicious/noArrayIndexKey: tech items are simple strings
                        key={`tech-${i}`}
                        className="rounded bg-gray-100 px-2 py-1 text-gray-600 text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const MinimalTemplate = ({ data }: { data: ResumeType }) => {
  return (
    <div
      className="resume-paper relative mx-auto min-h-[297mm] max-w-[210mm] bg-[#f5f5f0] p-12 text-[#333] shadow-lg"
      style={{ fontFamily: "serif" }}
    >
      {/* Header */}
      <div className="mb-12">
        <h1 className="mb-2 font-bold text-4xl text-[#4a4a4a]">
          {data.personalInfo?.fullName || "Your Name"}
        </h1>
        <div className="space-x-4 text-[#666] text-sm">
          {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo?.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo?.address && (
            <span>{data.personalInfo.address}</span>
          )}
        </div>
        <div className="mt-1 space-x-4 text-[#666] text-sm">
          {data.personalInfo?.linkedin && (
            <a href={data.personalInfo.linkedin} className="hover:underline">
              LinkedIn
            </a>
          )}
          {data.personalInfo?.github && (
            <a href={data.personalInfo.github} className="hover:underline">
              GitHub
            </a>
          )}
          {data.personalInfo?.portfolio && (
            <a href={data.personalInfo.portfolio} className="hover:underline">
              Portfolio
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {data.summary && (
          <section>
            <h3 className="mb-4 border-[#ddd] border-b bg-[#e8e8e8] py-1 pb-2 text-center font-bold text-[#4a4a4a] text-lg uppercase tracking-widest">
              Profile
            </h3>
            <p className="text-justify text-sm leading-relaxed">
              {data.summary}
            </p>
          </section>
        )}

        {data.experience && data.experience.length > 0 && (
          <section>
            <h3 className="mb-4 border-[#ddd] border-b bg-[#e8e8e8] py-1 pb-2 text-center font-bold text-[#4a4a4a] text-lg uppercase tracking-widest">
              Work Experience
            </h3>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div
                  key={exp.id || `exp-${index}`}
                  className="grid grid-cols-[1fr_3fr] gap-4"
                >
                  <div className="text-sm">
                    <div className="font-bold text-[#4a4a4a]">
                      {exp.startDate} –
                    </div>
                    <div className="font-bold text-[#4a4a4a]">
                      {exp.endDate || "Present"}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2c3e50] text-lg">
                      {exp.company}
                    </h4>
                    <div className="mb-2 text-[#555] text-sm italic">
                      {exp.role}
                    </div>
                    <ul className="ml-4 list-disc space-y-1 text-[#444] text-sm">
                      {(Array.isArray(exp.description)
                        ? exp.description
                        : exp.description
                          ? [exp.description]
                          : []
                      ).map((line, i) => (
                        <li
                          // biome-ignore lint/suspicious/noArrayIndexKey: description points are simple strings
                          key={`line-${i}`}
                        >
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education && data.education.length > 0 && (
          <section>
            <h3 className="mb-4 border-[#ddd] border-b bg-[#e8e8e8] py-1 pb-2 text-center font-bold text-[#4a4a4a] text-lg uppercase tracking-widest">
              Education
            </h3>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div
                  key={edu.id || `edu-${index}`}
                  className="grid grid-cols-[1fr_3fr] gap-4"
                >
                  <div className="font-bold text-[#4a4a4a] text-sm">
                    {edu.startDate} – {edu.endDate}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2c3e50]">{edu.degree}</h4>
                    <div className="text-[#555] text-sm">{edu.institution}</div>
                    {edu.grade && (
                      <div className="text-[#555] text-sm">
                        GPA: {edu.grade}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.projects && data.projects.length > 0 && (
          <section>
            <h3 className="mb-4 border-[#ddd] border-b bg-[#e8e8e8] py-1 pb-2 text-center font-bold text-[#4a4a4a] text-lg uppercase tracking-widest">
              Projects
            </h3>
            <div className="space-y-6">
              {data.projects.map((project, index) => (
                <div key={project.id || `project-${index}`}>
                  <h4 className="font-bold text-[#2c3e50] text-lg">
                    {project.name}
                  </h4>
                  <p className="mb-2 text-[#444] text-sm">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 text-[#555] text-sm">
                    <span className="font-semibold">Tech:</span>
                    {project.tech.join(", ")}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.skills && data.skills.length > 0 && (
          <section>
            <h3 className="mb-4 border-[#ddd] border-b bg-[#e8e8e8] py-1 pb-2 text-center font-bold text-[#4a4a4a] text-lg uppercase tracking-widest">
              Skills
            </h3>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-[#444] text-sm">
              {data.skills.map((skill, index) => (
                <div
                  // biome-ignore lint/suspicious/noArrayIndexKey: skills are simple strings
                  key={`skill-${index}`}
                  className="flex items-center"
                >
                  <span className="mr-2 text-[#888]">•</span>
                  {skill}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

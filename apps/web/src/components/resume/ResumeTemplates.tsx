import type { ResumeType } from "@/app/schemas/ResumeSchema";

export const ModernTemplate = ({ data }: { data: ResumeType }) => {
  return (
    <div
      className="resume-paper relative max-w-[210mm] min-h-[297mm] mx-auto bg-white text-black p-12 shadow-lg"
      style={{
        fontFamily: "Georgia, serif",
      }}
    >
      {/* Page 1 Marker */}
      <div className="absolute top-2 right-4 text-xs text-gray-300 font-sans pointer-events-none no-print">
        Page 1
      </div>

      {/* Page Break Indicators */}
      {[1, 2, 3].map((page) => (
        <div
          key={page}
          className="absolute left-0 right-0 flex flex-col items-center justify-center pointer-events-none no-print"
          style={{
            top: `${page * 297}mm`,
            height: "20px",
            transform: "translateY(-50%)",
          }}
        >
          {/* Visual Gap */}
          <div className="w-full h-[2px] bg-gray-300 border-dashed border-gray-400" />
          <div className="bg-gray-100 px-2 text-xs text-gray-500 font-sans -mt-2">
            End of Page {page} • Start of Page {page + 1}
          </div>
        </div>
      ))}

      {/* Header with Name and Contact */}
      {data.personalInfo && (
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2">
            {data.personalInfo.fullName || "Your Name"}
          </h1>
          <div className="flex items-center justify-center gap-3 text-sm">
            {data.personalInfo.email && (
              <>
                <span>✉</span>
                <span>{data.personalInfo.email}</span>
              </>
            )}
            {data.personalInfo.phone && (
              <>
                <span>📞</span>
                <span>{data.personalInfo.phone}</span>
              </>
            )}
          </div>
          {(data.personalInfo.linkedin ||
            data.personalInfo.github ||
            data.personalInfo.portfolio) && (
            <div className="flex items-center justify-center gap-3 text-sm mt-1">
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
          <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-3">
            Summary
          </h2>
          <p className="text-sm leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Education */}
      {data.education && data.education.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-3">
            Education
          </h2>
          {data.education.map((edu, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline">
                <div>
                  <p className="font-bold">{edu.institution}</p>
                  <p className="text-sm italic">{edu.degree}</p>
                </div>
                <p className="text-sm">{edu.endDate}</p>
              </div>
              {edu.grade && <p className="text-sm mt-1">GPA: {edu.grade}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Technical Skills */}
      {data.skills && data.skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-3">
            Technical Skills
          </h2>
          <div className="grid grid-cols-6 gap-x-4 gap-y-2 text-sm">
            {data.skills.map((skill, index) => (
              <div key={index} className="flex items-start">
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
          <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-3">
            Professional Experience
          </h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between items-baseline mb-1">
                <div>
                  <p className="font-bold">{exp.company}</p>
                  <p className="text-sm italic">{exp.role}</p>
                </div>
                <p className="text-sm">
                  {exp.startDate} - {exp.endDate || "present"}
                </p>
              </div>
              <div className="text-sm mt-2">
                {exp.description.split("\n").map((line, i) => (
                  <div key={i} className="flex items-start mb-1">
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
          <h2 className="text-lg font-bold border-b-2 border-black pb-1 mb-3">
            Projects
          </h2>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <p className="font-bold">{project.name}</p>
              <p className="text-sm mt-1">{project.description}</p>
              <div className="flex flex-wrap gap-2 text-sm mt-2">
                <span className="font-semibold">Technologies:</span>
                {project.tech.map((tech, techIndex) => (
                  <span key={techIndex}>
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
      className="resume-paper relative max-w-[210mm] min-h-[297mm] mx-auto bg-white text-black shadow-lg flex"
      style={{ fontFamily: "sans-serif" }}
    >
      {/* Sidebar */}
      <div className="w-1/3 bg-[#1a2a3a] text-white p-8 flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold leading-tight mb-2">
            {data.personalInfo?.fullName?.split(" ").map((name, i) => (
              <span key={i} className="block">
                {name}
              </span>
            )) || "Your Name"}
          </h1>
          <p className="text-gray-300 text-lg mt-2">
            {/* Role placeholder - could be added to schema later */}
          </p>
        </div>

        <div className="space-y-4 text-sm">
          {data.personalInfo?.email && (
            <div className="flex items-center gap-2">
              <span>✉</span>
              <span className="break-all">{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo?.phone && (
            <div className="flex items-center gap-2">
              <span>📞</span>
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo?.address && (
            <div className="flex items-center gap-2">
              <span>📍</span>
              <span>{data.personalInfo.address}</span>
            </div>
          )}
          {data.personalInfo?.linkedin && (
            <div className="flex items-center gap-2">
              <span>in</span>
              <a
                href={data.personalInfo.linkedin}
                className="hover:underline break-all"
              >
                LinkedIn
              </a>
            </div>
          )}
        </div>

        {data.skills && data.skills.length > 0 && (
          <div>
            <h3 className="text-lg font-bold uppercase tracking-wider border-b border-gray-600 pb-2 mb-4">
              Skills
            </h3>
            <ul className="space-y-2 text-sm">
              {data.skills.map((skill, index) => (
                <li key={index}>• {skill}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 p-8 bg-white">
        {data.summary && (
          <div className="mb-8">
            <h3 className="text-lg font-bold uppercase tracking-wider border-b-2 border-gray-200 pb-2 mb-4 flex items-center gap-2">
              <span>👤</span> Profile
            </h3>
            <p className="text-sm leading-relaxed text-gray-700">
              {data.summary}
            </p>
          </div>
        )}

        {data.experience && data.experience.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold uppercase tracking-wider border-b-2 border-gray-200 pb-2 mb-4 flex items-center gap-2">
              <span>💼</span> Professional Experience
            </h3>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={index}>
                  <h4 className="font-bold text-gray-900">{exp.company}</h4>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span className="italic">{exp.role}</span>
                    <span>
                      {exp.startDate} – {exp.endDate || "Present"}
                    </span>
                  </div>
                  <ul className="text-sm text-gray-700 space-y-1 list-disc list-outside ml-4">
                    {exp.description.split("\n").map((line, i) => (
                      <li key={i}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.education && data.education.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-bold uppercase tracking-wider border-b-2 border-gray-200 pb-2 mb-4 flex items-center gap-2">
              <span>🎓</span> Education
            </h3>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index}>
                  <h4 className="font-bold text-gray-900">{edu.institution}</h4>
                  <div className="text-sm text-gray-600">
                    <div>{edu.degree}</div>
                    <div>{edu.endDate}</div>
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
      className="resume-paper relative max-w-[210mm] min-h-[297mm] mx-auto bg-[#f5f5f0] text-[#333] p-12 shadow-lg"
      style={{ fontFamily: "serif" }}
    >
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-[#4a4a4a] mb-2">
          {data.personalInfo?.fullName || "Your Name"}
        </h1>
        <div className="text-sm text-[#666] space-x-4">
          {data.personalInfo?.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo?.phone && <span>{data.personalInfo.phone}</span>}
          {data.personalInfo?.address && (
            <span>{data.personalInfo.address}</span>
          )}
        </div>
        <div className="text-sm text-[#666] space-x-4 mt-1">
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
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {data.summary && (
          <section>
            <h3 className="text-center text-lg font-bold uppercase tracking-widest text-[#4a4a4a] border-b border-[#ddd] pb-2 mb-4 bg-[#e8e8e8] py-1">
              Profile
            </h3>
            <p className="text-sm leading-relaxed text-justify">
              {data.summary}
            </p>
          </section>
        )}

        {data.experience && data.experience.length > 0 && (
          <section>
            <h3 className="text-center text-lg font-bold uppercase tracking-widest text-[#4a4a4a] border-b border-[#ddd] pb-2 mb-4 bg-[#e8e8e8] py-1">
              Work Experience
            </h3>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={index} className="grid grid-cols-[1fr_3fr] gap-4">
                  <div className="text-sm">
                    <div className="font-bold text-[#4a4a4a]">
                      {exp.startDate} –
                    </div>
                    <div className="font-bold text-[#4a4a4a]">
                      {exp.endDate || "Present"}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-[#2c3e50]">
                      {exp.company}
                    </h4>
                    <div className="text-sm italic text-[#555] mb-2">
                      {exp.role}
                    </div>
                    <ul className="text-sm space-y-1 list-disc ml-4 text-[#444]">
                      {exp.description.split("\n").map((line, i) => (
                        <li key={i}>{line}</li>
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
            <h3 className="text-center text-lg font-bold uppercase tracking-widest text-[#4a4a4a] border-b border-[#ddd] pb-2 mb-4 bg-[#e8e8e8] py-1">
              Education
            </h3>
            <div className="space-y-4">
              {data.education.map((edu, index) => (
                <div key={index} className="grid grid-cols-[1fr_3fr] gap-4">
                  <div className="text-sm font-bold text-[#4a4a4a]">
                    {edu.startDate} – {edu.endDate}
                  </div>
                  <div>
                    <h4 className="font-bold text-[#2c3e50]">{edu.degree}</h4>
                    <div className="text-sm text-[#555]">{edu.institution}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {data.skills && data.skills.length > 0 && (
          <section>
            <h3 className="text-center text-lg font-bold uppercase tracking-widest text-[#4a4a4a] border-b border-[#ddd] pb-2 mb-4 bg-[#e8e8e8] py-1">
              Skills
            </h3>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm text-[#444]">
              {data.skills.map((skill, index) => (
                <div key={index} className="flex items-center">
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

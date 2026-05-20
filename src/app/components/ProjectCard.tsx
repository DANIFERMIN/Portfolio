import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "./projects-data";
import { cardImages } from "./card-images";

interface ProjectCardProps {
  project: Project;
  index: number;
  onClick: (project: Project) => void;
}

export function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const designImg = cardImages[project.id];

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onClick={() => onClick(project)}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer bg-card border border-border hover:border-transparent transition-all duration-300 hover:shadow-2xl ${
        project.featured ? "md:col-span-2" : ""
      }`}
      style={{ boxShadow: "0 0 0 0px transparent" }}
      whileHover={{ scale: 1.01 }}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden bg-secondary ${
          project.featured ? "h-72 md:h-80" : "h-52"
        }`}
      >
        <img
          src={designImg ? designImg.src : project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={designImg ? { objectPosition: designImg.objectPosition } : undefined}
        />
        {/* Overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300 opacity-40 group-hover:opacity-60"
          style={{
            background: `linear-gradient(160deg, ${project.accentColor}33 0%, #00000099 100%)`,
          }}
        />

        {/* Live / Internal badge */}
        {(project.isLive || project.isInternal) && (
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm border border-border">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: project.isInternal ? "#6366f1" : "#10b981" }}
            />
            <span
              className="text-foreground"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 500 }}
            >
              {project.isInternal ? "HP Internal" : "Live product"}
            </span>
          </div>
        )}

        {/* Category chip */}
        <div
          className="absolute top-4 right-4 px-3 py-1 rounded-full backdrop-blur-sm"
          style={{
            background: `${project.accentColor}22`,
            border: `1px solid ${project.accentColor}44`,
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 500,
              color: project.accentColor,
            }}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Metric chip — outcome-first */}
        <div
          className="inline-flex items-baseline gap-2 mb-4 px-3 py-1.5 rounded-full"
          style={{
            background: `${project.accentColor}14`,
            border: `1px solid ${project.accentColor}33`,
          }}
          aria-label={`Key outcome: ${project.metric.value} ${project.metric.label}`}
        >
          <span
            style={{
              fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 700,
              fontSize: "0.95rem",
              letterSpacing: "-0.02em",
              color: project.accentColor,
              lineHeight: 1,
            }}
            aria-hidden="true"
          >
            {project.metric.value}
          </span>
          <span
            className="text-muted-foreground"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 500 }}
            aria-hidden="true"
          >
            {project.metric.label}
          </span>
        </div>

        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <p
              className="text-muted-foreground mb-1"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", fontWeight: 400 }}
            >
              {project.company} · {project.year}
            </p>
            <h3
              className="text-foreground"
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontWeight: 600,
                fontSize: project.featured ? "1.35rem" : "1.1rem",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              {project.title}
            </h3>
          </div>
          <div className="flex-shrink-0 w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground transition-all duration-300 group-hover:border-foreground group-hover:text-foreground group-hover:bg-foreground group-hover:text-background">
            <ArrowUpRight size={16} />
          </div>
        </div>

        <p
          className="text-muted-foreground mb-4"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.875rem",
            lineHeight: 1.6,
            fontWeight: 400,
          }}
        >
          {project.shortDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-md bg-secondary text-muted-foreground"
              style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", fontWeight: 400 }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

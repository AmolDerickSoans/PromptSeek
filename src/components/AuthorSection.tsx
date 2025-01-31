import Image from "next/image";
import { X } from "lucide-react";
type Author = {
  name: string;
  image?: { url: string };
  expertise?: string[];
  bio: any; // Replace 'any' with the appropriate type if known
  featuredProjects?: { projectName: string; projectLink: string; description: string }[];
  social?: { twitter?: string; /* Add other social fields if needed */ };
};

export default function AuthorSection({ author }: { author: Author }) {
    return (
      <div className="bg-gray-100 p-6 rounded-lg">
        <div className="flex items-center space-x-4 mb-4">
          <Image 
            src={author.image?.url || '/default-avatar.png'} 
            alt={author.name} 
            width={80} 
            height={80} 
            className="rounded-full"
          />
          <div>
            <h3 className="text-xl font-bold">{author.name}</h3>
            <p className="text-gray-600">{author.expertise?.join(', ')}</p>
          </div>
        </div>
        
        {/* <PortableText value={author.bio} /> */}
        
        {author.featuredProjects && (
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Featured Projects</h4>
            {author.featuredProjects.map(project => (
              <div key={project.projectName} className="mb-2">
                <a 
                  href={project.projectLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {project.projectName}
                </a>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex space-x-4 mt-4">
          {author.social?.twitter && (
            <a href={author.social.twitter} target="_blank" rel="noopener noreferrer">
              <X className="h-5 w-5" />
            </a>
          )}
          {/* Similar links for LinkedIn, GitHub */}
        </div>
      </div>
    )
  }
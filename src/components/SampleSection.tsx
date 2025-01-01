import React from "react"
import { Play, Video } from "lucide-react"

const SampleSection: React.FC = () => {
  return (
    <section className="pb-20 pt-8 bg-black/80">
      <div className="max-w-6xl mx-auto px-4">
        <h2
          className="text-4xl title-font text-[#fffbfb] mb-12 text-center"
          style={{ zIndex: 100 }}
        >
          PAST MISSIONS
        </h2>

        <div className="flex justify-center">
          {/* Audio Samples */}
          <div className="space-y-6 max-w-xl w-full">
            <h3 className="text-2xl text-[#ff3e3e] mb-4 flex items-center gap-2">
              <Play className="w-6 h-6" />
              Audio Samples
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map(index => (
                <div
                  key={index}
                  className="bg-black/60 border border-[#ff3e3e] rounded-lg p-4 hover:border-[#ff5555] 
                           transition-colors cursor-pointer"
                >
                  <p className="text-lg mb-2">Sample Roast #{index}</p>
                  <audio controls className="w-full">
                    <source src={`/sample-${index}.mp3`} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ))}
            </div>
          </div>

          {/* Video Samples */}
          {/*      <div className="space-y-6">
            <h3 className="text-2xl text-[#ff3e3e] mb-4 flex items-center gap-2">
              <Video className="w-6 h-6" />
              Video Samples
            </h3>
            <div className="space-y-4">
              {[1, 2].map(index => (
                <div
                  key={index}
                  className="bg-black/60 border border-[#ff3e3e] rounded-lg p-4 hover:border-[#ff5555] 
                           transition-colors aspect-video relative"
                >
                  <iframe
                    className="absolute inset-0 w-full h-full rounded-lg"
                    src="https://www.youtube.com/embed/SAMPLE_VIDEO_ID"
                    title={`Sample Roast Video #${index}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </section>
  )
}

export default SampleSection

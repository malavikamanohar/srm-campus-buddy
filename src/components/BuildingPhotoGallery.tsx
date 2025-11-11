import { useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface BuildingPhotoGalleryProps {
  photos: string[];
  buildingName: string;
  panoramaUrl?: string;
}


export const BuildingPhotoGallery = ({
  photos,
  buildingName,
  panoramaUrl,
}: BuildingPhotoGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showPanorama, setShowPanorama] = useState(false);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  if (photos.length === 0 && !panoramaUrl) {
    return (
      <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
        <span className="text-muted-foreground text-sm">No photos available</span>
      </div>
    );
  }

  return (
    <>
      <div className="relative w-full h-48 bg-muted rounded-lg overflow-hidden group">
        {photos.length > 0 && (
          <>
            <img
              src={photos[currentIndex]}
              alt={`${buildingName} - Photo ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
            
            {photos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}

            <button
              onClick={() => setIsFullscreen(true)}
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Maximize2 className="h-4 w-4" />
            </button>

            {photos.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {photos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentIndex
                        ? "bg-white w-4"
                        : "bg-white/50 hover:bg-white/75"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {panoramaUrl && (
          <button
            onClick={() => setShowPanorama(true)}
            className="absolute bottom-2 right-2 bg-primary hover:bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-md text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
          >
            360° View
          </button>
        )}
      </div>

      {/* Fullscreen Dialog */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-5xl h-[80vh] p-0">
          <div className="relative w-full h-full bg-black">
            <img
              src={photos[currentIndex]}
              alt={`${buildingName} - Photo ${currentIndex + 1}`}
              className="w-full h-full object-contain"
            />
            
            {photos.length > 1 && (
              <>
                <button
                  onClick={prevPhoto}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={nextPhoto}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
              {currentIndex + 1} / {photos.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 360° Panorama Dialog */}
      <Dialog open={showPanorama} onOpenChange={setShowPanorama}>
        <DialogContent className="max-w-5xl h-[80vh] p-0">
          <div className="relative w-full h-full bg-black">
            <iframe
              src={panoramaUrl}
              className="w-full h-full"
              title={`${buildingName} 360° View`}
              allowFullScreen
            />
            <button
              onClick={() => setShowPanorama(false)}
              className="absolute top-4 right-4 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full z-10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

type ImageSelectionMeta = {
    artistName: string;
    imageUrl: string;
    style: string;
    wiki: string;
};

export type ImageSelectionProps = {
    artistStyles: ImageSelectionMeta[];
    selectCallback: (selection: ImageSelectionMeta) => void;
};

export default function ArtistStyleSelectionByImage({ artistStyles, selectCallback }: ImageSelectionProps) {
    return (
        <div className="flex max-w-full flex-col justify-center bg-white">
            <span className="text-center">Choose an artist to emulate</span>
            <div className="mx-auto pb-12">
                <h2 className="sr-only">Artists</h2>
                <div>
                    {artistStyles.map((artistMeta, i) => (
                        <div onClick={() => selectCallback(artistMeta)} className="my-6 grid grid-cols-3 gap-y-10 gap-x-6 py-2 px-2 hover:bg-gray-500">
                            <h3 className="mt-4 text-sm text-gray-700">{artistMeta.artistName}</h3>
                            <p className="mt-1 text-lg font-medium text-gray-900">{artistMeta.style}</p>
                            <div className="aspect-w-1 aspect-h-1 xl:aspect-w-7 xl:aspect-h-8 w-full overflow-hidden rounded-lg bg-gray-200">
                                <img
                                    src={artistMeta.imageUrl}
                                    alt={artistMeta.artistName}
                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                    height={250}
                                    width={250}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

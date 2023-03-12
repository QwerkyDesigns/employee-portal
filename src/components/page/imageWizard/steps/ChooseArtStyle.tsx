import { Button } from '@/components/buttons/Button';
import Divider from '@/components/dividers/Divider';
import ArtistStyleSelectionByImage from '@/components/image/selection/artistStyles/ImageSelection';
import { PaddedImage } from '@/components/images/PaddedImage';
import SelectionModal from '@/components/modals/SelectionModal';
import Select from '@/components/select/Select';
import { ArtStyles, ImageWizardContext, ImageWizardContextType } from '@/lib/contexts/ImageWizardContext';
import { artistStyleMap, artStyleNames } from '@/lib/static/artStyles';
import { ArtistStyleMeta } from '@/types/sharedTypes';
import { useContext, useState } from 'react';

export const ChooseArtStyle = () => {
    const { artStyles, setArtStyles } = useContext<ImageWizardContextType>(ImageWizardContext);

    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const onArtStyleNameSelect = (e: any) => {
        if (!setArtStyles) return;
        if (e) {
            const style = e.target.value;
            setArtStyles((cur) => {
                const newStyle: ArtStyles = { ...cur, style: style };
                return newStyle;
            });
        }
    };

    const selectCallback = (artistMeta: ArtistStyleMeta) => {
        if (!setArtStyles) return;
        setArtStyles((cur) => {
            const newArtStyles: ArtStyles = { ...cur, artist: artistMeta };
            return newArtStyles;
        });
        setOpenDialog(false);
    };

    return (
        <>
            <div className="flex flex-col justify-center">
                <div className="flex flex-row justify-center">
                    <Select
                        label="What kind of art style are you interested to use?"
                        value={artStyles?.style}
                        options={artStyleNames.sort()}
                        onChange={onArtStyleNameSelect}
                    />
                </div>
                <Divider text="and optionally" classNames="mt-12" />
                <div className="mt-12 flex flex-col justify-center">
                    <div className="flex flex-col justify-center">
                        <Button
                            onClick={() => {
                                setOpenDialog(true);
                            }}
                        >
                            Choose an artist to emulate
                        </Button>
                    </div>
                    {artStyles.artist && (
                        <div className="flex flex-col justify-center border-2 text-center">
                            <span className="pt-12 font-extrabold">{artStyles?.artist.artistName}</span>
                            <span className="pt-6 font-bold">{artStyles?.artist.style}</span>
                            <PaddedImage url={artStyles?.artist.imageUrl ?? ''} alt={artStyles?.artist.artistName} />
                        </div>
                    )}
                </div>
            </div>
            {openDialog && (
                <SelectionModal open={openDialog} setOpen={setOpenDialog}>
                    <ArtistStyleSelectionByImage artistStyles={artistStyleMap} selectCallback={selectCallback} />
                </SelectionModal>
            )}
        </>
    );
};

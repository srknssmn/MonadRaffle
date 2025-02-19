export const calculateTime = async (currentseconds) => {
    
    currentseconds = Number(currentseconds);
    let d = Math.floor(currentseconds / (3600*24));
    let h = Math.floor(currentseconds % (3600*24) / 3600);
    let m = Math.floor(currentseconds % 3600 / 60);
    let s = Math.floor(currentseconds % 60);

    let dDisplay = d > 0 ? d : "";
    let hDisplay = h > 0 ? h : "";
    let mDisplay = m > 0 ? m : "";
    let sDisplay = s > 0 ? s : "";

    const timeInfo = {
        dDisplay: dDisplay,
        hDisplay: hDisplay,
        mDisplay: mDisplay,
        sDisplay: sDisplay
    }
    
    return (
        timeInfo
    )
}
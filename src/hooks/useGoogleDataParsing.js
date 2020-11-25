
const useGoogleDataParsing = (jsonData, table) => {
    const queryFrame = /google\.visualization\.Query\.setResponse\((.*)\);/;
    const myData = JSON.parse( queryFrame.exec( jsonData.toString() )['1'] ).table.rows.map((x)=>x.c);
    if ( table === "lobby" ) {
        return myData.map( (d) => {
            return d[0].v === "head" || d[0].v === "sub" ?
            {
                type : d[0].v,
                title : d[1].v,
                desc : d[2].v
            } :
            d[0].v === "entrance" ?
            {
                type : d[0].v,
                workID : d[1].v
            } :
            d;
        })
    } 
    else if( table === "worksInfoForLobby" ) {
        return myData.map( (d) =>  {
            return {
                workID : d[0].v,
                title : d[1].v,
                desc : d[2].v,
                thumbnail : d[3].v
            }
        })
    }
    else if( table === "worksInfoForGallery" ){
        return myData.map( (d) => {
            return{
                level : d[0].v,
                title : d[1].v,
                artists : d[2].v.split('/'),
                genre : d[3].v,
                archiving : d[4].v,
                detailDesc : d[5].v
            }
        })
    }
    else if( table === "worksDetail" ){
        return myData.map( (d) => {
            return d[0].v === "link" ?
            {
                type : d[0].v,
                src : d[1].v,
                href : d[2].v
            }
            :
            {
                type : d[0].v,
                source : d[1].v
            }
        })
    }
    
    return myData;
}
export default useGoogleDataParsing;
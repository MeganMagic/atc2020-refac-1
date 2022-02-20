
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
                teamName : d[2].v,
                artists : d[3].v.split('/'),
                genre : d[4].v,
                archiving : d[5].v,
                detailDesc : d[6].v,
                interview : d[7].v
            }
        })
    }
    else if( table === "worksDetail" ){
        return myData.map( (d) => {
            return d[0].v === "link" ?
            {
                type : d[0].v,
                src : d[1].v,
                href : d[2].v,
                caption : d[3].v
            }
            :
            {
                type : d[0].v,
                source : d[1].v
            }
        })
    }
    else if( table === "logs" ){
        return myData.map( (d) => {
            return {
                timestamp : d[0].f,
                name : d[1].v,
                comment : d[2].v
            }
        }).reverse()
    }
    
    return myData;
}
export default useGoogleDataParsing;
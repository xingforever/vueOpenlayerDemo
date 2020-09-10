import mapconfig from '../config/mapconfig.js'
import XYZ from 'ol/source/XYZ'
import TileLayer from 'ol/layer/Tile'

const mapSrc = mapconfig.mapSrc
//底图图层
const baseLayers = {

    /*天地图矢量*/
    tdtVec: new TileLayer({
        id: 'base_tdtVec',
        name: 'tdtVec',
        zIndex: -1000000000,
        visible: true,
        source: new XYZ({
            crossOrigin: 'anonymous', //允许跨域
            url: mapSrc.tdtVec
        })
    }),
    /*天地图影像*/
    tdtImg: new TileLayer({
        id: 'base_tdtImg',
        name: 'tdtImg',
        zIndex: -1000000000,
        visible: false,
        source: new XYZ({
            crossOrigin: 'anonymous',
            url: mapSrc.tdtImg
        })
    }),

    /*天地图地形*/
    tdtTer: new TileLayer({
        id: 'base_tdtTer',
        zIndex: -1000000000,
        name: 'tdtTer',
        visible: false,
        source: new XYZ({
            crossOrigin: 'anonymous',
            url: mapSrc.tdtTer
        })
    }),
    /*天地图矢量标注*/
    tdtCva: new TileLayer({
        id: 'base_tdtCva',
        zIndex: -999999999,
        name: 'tdtCva',
        visible: true,
        source: new XYZ({
            crossOrigin: 'anonymous',
            url: mapSrc.tdtCva
        })
    }),
    /*天地图影像标注*/
    tdtCia: new TileLayer({
        id: 'base_tdtCia',
        zIndex: -999999999,
        name: 'tdtCia',
        visible: false,
        source: new XYZ({
            crossOrigin: 'anonymous',
            url: mapSrc.tdtCia
        })
    }),
    /*天地图地形标注*/
    tdtCta: new TileLayer({
        id: 'base_tdtCta',
        zIndex: -999999999,
        name: 'tdtCta',
        visible: false,
        source: new XYZ({
            crossOrigin: 'anonymous',
            url: mapSrc.tdtCta
        })
    }),
}
export default baseLayers
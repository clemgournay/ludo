export class AssetManager {

    assetsToLoad: Array<any>;
    assets: any;

    constructor() {
        this.assets = {};
    }

    async load(assetsToLoad: Array<any>): Promise<any> {
        this.assetsToLoad = assetsToLoad;
        for (let x = 0; x < this.assetsToLoad.length; x++) {
            const asset = this.assetsToLoad[x];

            switch (asset.type) {
                case 'img':
                    this.assets[asset.id] = await this.loadIMG(asset);
                    break;
            }
        }
        return this.assets;
    }

    async loadIMG(asset: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = asset.src;
            img.onload = function () {
                resolve(this);
            }
        });
        
    }

}
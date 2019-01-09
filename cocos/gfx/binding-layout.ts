import { GFXBuffer } from './buffer';
import { GFXBindingType } from './define';
import { GFXDevice } from './device';
import { GFXSampler } from './sampler';
import { GFXTextureView } from './texture-view';

export interface IGFXBinding {
    binding: number;
    type: GFXBindingType;
    name: string;
}

export interface IGFXBindingLayoutInfo {
    bindings: IGFXBinding[];
}

export class GFXBindingUnit {
    public binding: number = 0;
    public type: GFXBindingType = GFXBindingType.UNKNOWN;
    public name: string = '';
    public buffer: GFXBuffer | null = null;
    public texView: GFXTextureView | null = null;
    public sampler: GFXSampler | null = null;
}

export abstract class GFXBindingLayout {

    protected _device: GFXDevice;
    protected _bindingUnits: GFXBindingUnit[] = [];

    constructor (device: GFXDevice) {
        this._device = device;
    }

    public abstract initialize (info: IGFXBindingLayoutInfo): boolean;
    public abstract destroy ();
    public abstract update ();

    public bindBuffer (binding: number, buffer: GFXBuffer) {
        for (const bindingUnit of this._bindingUnits) {
            if (bindingUnit.binding === binding) {
                if (bindingUnit.type === GFXBindingType.UNIFORM_BUFFER) {
                    bindingUnit.buffer = buffer;
                } else {
                    console.error('Setting binding is not GFXBindingType.UNIFORM_BUFFER.');
                }
                return;
            }
        }
    }

    public bindSampler (binding: number, sampler: GFXSampler) {
        for (const bindingUnit of this._bindingUnits) {
            if (bindingUnit.binding === binding) {
                if (bindingUnit.type === GFXBindingType.SAMPLER) {
                    bindingUnit.sampler = sampler;
                } else {
                    console.error('Setting binding is not GFXBindingType.SAMPLER.');
                }
                return;
            }
        }
    }

    public bindTextureView (binding: number, texView: GFXTextureView) {
        for (const bindingUnit of this._bindingUnits) {
            if (bindingUnit.binding === binding) {
                if (bindingUnit.type === GFXBindingType.SAMPLER) {
                    bindingUnit.texView = texView;
                } else {
                    console.error('Setting binding is not GFXBindingType.SAMPLER.');
                }
                return;
            }
        }
    }

    public getBindingUnit(binding: number): GFXBindingUnit {
        for (let i = 0; i < this._bindingUnits.length; i++) {
            if (this._bindingUnits[i].binding === binding) {
                return this._bindingUnits[i];
            }
        }
        return null;
    }
}

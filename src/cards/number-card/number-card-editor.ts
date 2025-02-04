import { html, TemplateResult } from "lit";
import { customElement, state } from "lit/decorators.js";
import memoizeOne from "memoize-one";
import { assert } from "superstruct";
import { fireEvent, LocalizeFunc, LovelaceCardEditor } from "../../ha";
import setupCustomlocalize from "../../localize";
import { computeActionsFormSchema } from "../../shared/config/actions-config";
import { APPEARANCE_FORM_SCHEMA } from "../../shared/config/appearance-config";
import { MushroomBaseElement } from "../../utils/base-element";
import { GENERIC_LABELS } from "../../utils/form/generic-fields";
import { HaFormSchema } from "../../utils/form/ha-form";
import { stateIcon } from "../../utils/icons/state-icon";
import { loadHaComponents } from "../../utils/loader";
import { NUMBER_CARD_EDITOR_NAME, NUMBER_ENTITY_DOMAINS } from "./const";
import { DISPLAY_MODES, NumberCardConfig, NumberCardConfigStruct } from "./number-card-config";

export const NUMBER_LABELS = ["display_mode"];

const computeSchema = memoizeOne((localize: LocalizeFunc, icon?: string): HaFormSchema[] => [
    { name: "entity", selector: { entity: { domain: NUMBER_ENTITY_DOMAINS } } },
    { name: "name", selector: { text: {} } },
    {
        type: "grid",
        name: "",
        schema: [
            { name: "icon", selector: { icon: { placeholder: icon } } },
            { name: "icon_color", selector: { "mush-color": {} } },
        ],
    },
    ...APPEARANCE_FORM_SCHEMA,
    {
        name: "display_mode",
        selector: {
            select: {
                options: ["default", ...DISPLAY_MODES].map((control) => ({
                    value: control,
                    label: localize(`editor.card.number.display_mode_list.${control}`),
                })),
                mode: "dropdown",
            },
        },
    },
    ...computeActionsFormSchema(),
]);

@customElement(NUMBER_CARD_EDITOR_NAME)
export class NumberCardEditor extends MushroomBaseElement implements LovelaceCardEditor {
    @state() private _config?: NumberCardConfig;

    connectedCallback() {
        super.connectedCallback();
        void loadHaComponents();
    }

    public setConfig(config: NumberCardConfig): void {
        assert(config, NumberCardConfigStruct);
        this._config = config;
    }

    private _computeLabel = (schema: HaFormSchema) => {
        const customLocalize = setupCustomlocalize(this.hass!);

        if (NUMBER_LABELS.includes(schema.name)) {
            return customLocalize(`editor.card.number.${schema.name}`);
        }

        if (GENERIC_LABELS.includes(schema.name)) {
            return customLocalize(`editor.card.generic.${schema.name}`);
        }

        return this.hass!.localize(`ui.panel.lovelace.editor.card.generic.${schema.name}`);
    };

    protected render(): TemplateResult {
        if (!this.hass || !this._config) {
            return html``;
        }

        const entityState = this._config.entity ? this.hass.states[this._config.entity] : undefined;
        const entityIcon = entityState ? stateIcon(entityState) : undefined;
        const icon = this._config.icon || entityIcon;

        const customLocalize = setupCustomlocalize(this.hass);

        const schema = computeSchema(customLocalize, icon);

        const data = { ...this._config } as any;
        if (!data.display_mode) {
            data.display_mode = "default";
        }

        return html`
            <ha-form
                .hass=${this.hass}
                .data=${data}
                .schema=${schema}
                .computeLabel=${this._computeLabel}
                @value-changed=${this._valueChanged}
            ></ha-form>
        `;
    }

    private _valueChanged(ev: CustomEvent): void {
        const value = ev.detail.value;

        if (value.display_mode === "default") {
            delete value.display_mode;
        }
        fireEvent(this, "config-changed", { config: ev.detail.value });
    }
}

import React from 'react';
import { Setting } from '../components/Setting';
import { SettingsState, useSettingsState } from '../state/settings';

type AttentionProperty =
  | 'disableAppTileUnreads'
  | 'disableAvatars'
  | 'disableNicknames'
  | 'disableSpellcheck'
  | 'disableRemoteContent';

const attentionProperties: Record<string, AttentionProperty> = {
  disableAppTileUnreads: 'disableAppTileUnreads',
  disableAvatars: 'disableAvatars',
  disableNicknames: 'disableNicknames',
  disableSpellcheck: 'disableSpellcheck',
  disableRemoteContent: 'disableRemoteContent'
};

async function toggle(property: AttentionProperty) {
  const selProp = (s: SettingsState) => s.calmEngine[property];
  const state = useSettingsState.getState();
  const curr = selProp(state);
  await state.putEntry('calmEngine', property, !curr);
}

export const AttentionAndPrivacy = () => {
  const {
    disableAppTileUnreads,
    disableAvatars,
    disableNicknames,
    disableSpellcheck,
    disableRemoteContent
  } = useSettingsState().calmEngine;

  return (
    <div className="flex flex-col space-y-4">
      <div className="inner-section relative space-y-8">
        <h2 className="h4">CalmEngine</h2>
        <span className="font-semibold text-gray-400">
          Modulate attention-hacking interfaces across your urbit
        </span>
        <Setting
          on={disableAppTileUnreads}
          toggle={() => toggle(attentionProperties.disableAppTileUnreads)}
          name="Hide unread counts on Landscape app tiles"
          className="text-gray-400"
          disabled
        >
          <p className="leading-5 text-gray-400">
            Turn off notification counts on individual app tiles.
          </p>
        </Setting>
        <Setting
          on={disableAvatars}
          toggle={() => toggle(attentionProperties.disableAvatars)}
          name="Disable avatars"
        >
          <p className="leading-5 text-gray-600">
            Turn user-set visual avatars off and only display urbit sigils
            across all of your apps.
          </p>
        </Setting>
        <Setting
          on={disableNicknames}
          toggle={() => toggle(attentionProperties.disableNicknames)}
          name="Disable nicknames"
        >
          <p className="leading-5 text-gray-600">
            Turn user-set nicknames off and only display urbit-style names
            across all of your apps.
          </p>
        </Setting>
      </div>
      <div className="inner-section relative space-y-8">
        <h2 className="h4">Privacy</h2>
        <span className="font-semibold text-gray-400">
          Limit your urbit’s ability to be read or tracked by clearnet services
        </span>
        <Setting
          on={disableSpellcheck}
          toggle={() => toggle(attentionProperties.disableSpellcheck)}
          name="Disable spell-check"
        >
          <p className="leading-5 text-gray-600">
            Turn spell-check off across all text inputs in your urbit’s
            software/applications. Spell-check reads your keyboard input, which
            may be undesirable.
          </p>
        </Setting>
        <Setting
          on={disableRemoteContent}
          toggle={() => toggle(attentionProperties.disableRemoteContent)}
          name="Disable remote content"
        >
          <p className="leading-5 text-gray-600">
            Turn off automatically-displaying media embeds across all of your
            urbit’s software/applications. This may result in some software
            appearing to have content missing.
          </p>
        </Setting>
      </div>
    </div>
  );
};

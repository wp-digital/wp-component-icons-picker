import { createElement } from "@wordpress/element";
import { chunk, has } from 'lodash';
import { BaseControl, Button, Icon, Flex, FlexItem, Modal } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
export default function IconsPicker(props) {
  const {
    label,
    icons,
    value,
    onChange
  } = props;
  const [isOpened, setIsOpened] = useState(false);
  const [selected, setSelected] = useState(value);

  if (!icons.length) {
    return null;
  }

  return createElement(BaseControl, null, createElement(BaseControl.VisualLabel, null, label), createElement(Button, {
    isTertiary: true,
    variant: "tertiary",
    isPressed: isOpened,
    onClick: () => {
      setIsOpened(!isOpened);
    }
  }, !value ? __('Add Icon', 'innocode-component-icons-picker') : __('Update Icon', 'innocode-component-icons-picker')), isOpened && createElement(Modal, {
    title: label,
    onRequestClose: () => {
      setIsOpened(false);
    }
  }, chunk(icons, 5).map(line => createElement(Flex, {
    key: line.map(icon => icon.value).join('|'),
    justify: "flex-start"
  }, line.map(icon => createElement(FlexItem, {
    key: icon.value,
    style: {
      marginBottom: 8
    }
  }, createElement(Button, {
    isPressed: icon.value === value,
    onClick: () => {
      setSelected(icon.value);
    }
  }, createElement(Icon, {
    icon: has(icon, 'icon') ? icon.icon : icon.value
  })))))), createElement(Flex, {
    justify: "flex-end"
  }, createElement(FlexItem, null, createElement(Button, {
    isPrimary: true,
    variant: "primary",
    onClick: () => {
      onChange(selected);
      setIsOpened(false);
    }
  }, __('Set Icon', 'innocode-component-icons-picker'))))));
}
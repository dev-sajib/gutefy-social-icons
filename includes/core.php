<?php

namespace GF_SOCIAL_ICONS;

use GF_SOCIAL_ICONS\Global\Settings;
use GF_SOCIAL_ICONS\BaseCustomizer;
use GF_SOCIAL_ICONS\Types\Panel;
use GF_SOCIAL_ICONS\Types\Partial;
use GF_SOCIAL_ICONS\Types\Section;
use GF_SOCIAL_ICONS\Types\Control;
use GF_SOCIAL_ICONS\Global\Helper;
use GF_SOCIAL_ICONS\TemplateLoader;

class Core extends BaseCustomizer
{
  public function __construct()
  {
    $this->add_main_panel();
    $this->add_sections();
    $this->add_controls();
    $this->add_partials();
    parent::__construct();
  }


  public function add_main_panel()
  {

    $panels = array(
      Settings::PANEL_CORE => [
        'title' => __('Gutefy Social Icons', TEXT_DOMAIN),
        'description' => __('<p>Gutefy Extensions for floating social icons</p>', TEXT_DOMAIN),
        'priority' => 31,
      ]
    );

    foreach ($panels as $panel_id => $args) {
      $this->add_panel(
        new Panel(
          $panel_id,
          $args
        )
      );
    }
  }

  public function add_sections()
  {
    $section = array(
      Settings::SECTION_GENERAL_SETTINGS => [
        'title' => __('General', TEXT_DOMAIN),
        'panel' => Settings::PANEL_CORE,
        'priority' => 1,
      ],
      Settings::SECTION_STYLE_SETTINGS => [
        'title' => __('Design', TEXT_DOMAIN),
        'panel' => Settings::PANEL_CORE,
        'priority' => 2,
      ]
    );

    foreach ($section as $section_id => $args) {
      $this->add_section(
        new Section(
          $section_id,
          $args
        )
      );
    }
  }

  public function add_controls()
  {
    $controls = [
      [
        'id' => Settings::GLOBAL_ID__TAB,
        'setting_args' => [
        ],
        'control_args' => [
          'priority' => 2,
          'section' => Settings::SECTION_STYLE_SETTINGS,
          'input_attrs' => array(
          ),
        ],
        'custom_control' => "\GF_SOCIAL_ICONS\Controls\Tabs"
      ],
      [
        'id' => Settings::GENERAL_SETTING_ID_SOCIAL_REPEATER,
        'setting_args' => [
          'default' => [['facebook', '', 'url']],
          'transport' => 'postMessage',
          'type' => 'option',
          'capability' => 'manage_options',
          // 'sanitize_callback' => [$this, 'gf_social_icons_custom_sanitize'],
          // 'validate_callback' => [$this, 'gf_social_icons_custom_url_validation'],
        ],
        'control_args' => [
          'label' => __('Accounts List', TEXT_DOMAIN),
          'section' => Settings::SECTION_GENERAL_SETTINGS,
          'input_attrs' => array(
          ),
        ],
        'custom_control' => "\GF_SOCIAL_ICONS\Controls\SocialRepeater"
      ],
      [
        'id' => Settings::GENERAL_SETTING_ID_OPEN_IN_NEW_TAB_SETTINGS,
        'setting_args' => [
          'default' => ['value'=>true, 'toggleValue' => ['true' => 'block', 'false' => 'none']],
          'transport' => 'postMessage',
          'type' => 'option',
          'capability' => 'manage_options',
          // 'sanitize_callback' => [$this, 'gf_social_icons_custom_sanitize'],
          // 'validate_callback' => [$this, 'gf_social_icons_custom_url_validation'],
        ],
        'control_args' => [
          'label' => __('Open in new Tab', TEXT_DOMAIN),
          'section' => Settings::SECTION_GENERAL_SETTINGS,
          'input_attrs' => array(
            'responsive' => false,
            'heading' => 'Advance Settings'
          ),
        ],
        'custom_control' => "\GF_SOCIAL_ICONS\Controls\Toggle"
      ],
      [
        'id' => Settings::CUSTOMIZER__STYLE__SETTINGS_ID__ARRAY['GENERAL_SETTING_ID_RESPONSIVE_CONTROL'],
        'setting_args' => [
          'default' => [
            [
              'css_attr' => 'display',
              'value' => ['desktop' => 'block'],
              'toggleValue' => ['true' => 'block', 'false' => 'none']
            ]
          ],
          'transport' => 'postMessage',
          'type' => 'option',
          'capability' => 'manage_options',
          // 'sanitize_callback' => [$this, 'gf_social_icons_custom_sanitize'],
          // 'validate_callback' => [$this, 'gf_social_icons_custom_url_validation'],
        ],
        'control_args' => [
          'label' => __('Set Visiblity', TEXT_DOMAIN),
          'section' => Settings::SECTION_GENERAL_SETTINGS,
          'input_attrs' => array(
            'responsive' => true,
            'css_selector' => "#gf_social_icons__wrapper",
            'heading' => 'Advance Settings'
          ),
        ],
        'custom_control' => "\GF_SOCIAL_ICONS\Controls\Toggle"
      ],
      [
        'id' => Settings::CUSTOMIZER__STYLE__SETTINGS_ID__ARRAY['STYLE_SETTING_ID_ICON_COLOR'],
        'setting_args' => [
          'default' => [
            [
              'css_attr' => 'fill',
              'value' => ['desktop' => '#ffffff'],
            ]
          ],
          'transport' => 'postMessage',
          'type' => 'option',
          'capability' => 'manage_options',
          // 'sanitize_callback' => [$this, 'gf_social_icons_custom_sanitize'],
          // 'validate_callback' => [$this, 'gf_social_icons_custom_url_validation'],
        ],
        'control_args' => [
          'label' => __('Icon Color', TEXT_DOMAIN),
          'section' => Settings::SECTION_STYLE_SETTINGS,
          'input_attrs' => array(
            'responsive' => true,
            'css_selector' => "#gf_social_icons__wrapper a.gf_social_icons_social_icon span svg",
            'heading' => 'Advance Settings',
            'control_for' => Settings::GENERAL_TAB_ELEMENT
          ),
        ],
        'custom_control' => "\GF_SOCIAL_ICONS\Controls\Color"
      ],
      [
        'id' => Settings::CUSTOMIZER__STYLE__SETTINGS_ID__ARRAY['STYLE_SETTING_ID_WRAPPER_BACKGROUND'],
        'setting_args' => [
          'default' => [
            [
              'css_attr' => 'background',
              'value' => ['desktop' => '#3858E9'],
            ]
          ],
          'transport' => 'postMessage',
          'type' => 'option',
          'capability' => 'manage_options',
          // 'sanitize_callback' => [$this, 'gf_social_icons_custom_sanitize'],
          // 'validate_callback' => [$this, 'gf_social_icons_custom_url_validation'],
        ],
        'control_args' => [
          'label' => __('Icon background color', TEXT_DOMAIN),
          'section' => Settings::SECTION_STYLE_SETTINGS,
          'input_attrs' => array(
            'responsive' => true,
            'css_selector' => "#gf_social_icons__wrapper a.gf_social_icons_social_icon",
            'heading' => 'Advance Settings',
            'control_for' => Settings::GENERAL_TAB_ELEMENT
          ),
        ],
        'custom_control' => "\GF_SOCIAL_ICONS\Controls\Color"
      ],
      [
        'id' => Settings::CUSTOMIZER__STYLE__SETTINGS_ID__ARRAY['STYLE_SETTING_ID_ICON_HOVER_COLOR'],
        'setting_args' => [
          'default' => [
            [
              'css_attr' => 'fill',
              'value' => ['desktop' => ''],
            ]
          ],
          'transport' => 'postMessage',
          'type' => 'option',
          'capability' => 'manage_options',
          // 'sanitize_callback' => [$this, 'gf_social_icons_custom_sanitize'],
          // 'validate_callback' => [$this, 'gf_social_icons_custom_url_validation'],
        ],
        'control_args' => [
          'label' => __('Icon color', TEXT_DOMAIN),
          'section' => Settings::SECTION_STYLE_SETTINGS,
          'input_attrs' => array(
            'responsive' => true,
            'css_selector' => "#gf_social_icons__wrapper a.gf_social_icons_social_icon:hover span svg",
            'heading' => 'Advance Settings',
            'control_for' => Settings::HOVER_TAB_ELEMENT
          ),
        ],
        'custom_control' => "\GF_SOCIAL_ICONS\Controls\Color"
      ],
      [
        'id' => Settings::CUSTOMIZER__STYLE__SETTINGS_ID__ARRAY['STYLE_SETTING_ID_WRAPPER_HOVER_BACKGROUND'],
        'setting_args' => [
          'default' => [
            [
              'css_attr' => 'background',
              'value' => ['desktop' => ''],
            ]
          ],
          'transport' => 'postMessage',
          'type' => 'option',
          'capability' => 'manage_options',
          // 'sanitize_callback' => [$this, 'gf_social_icons_custom_sanitize'],
          // 'validate_callback' => [$this, 'gf_social_icons_custom_url_validation'],
        ],
        'control_args' => [
          'label' => __('Icon background color', TEXT_DOMAIN),
          'section' => Settings::SECTION_STYLE_SETTINGS,
          'input_attrs' => array(
            'responsive' => true,
            'css_selector' => "#gf_social_icons__wrapper a.gf_social_icons_social_icon:hover",
            'heading' => 'Advance Settings',
            'control_for' => Settings::HOVER_TAB_ELEMENT
          ),
        ],
        'custom_control' => "\GF_SOCIAL_ICONS\Controls\Color"
      ],
      [
        'id' => Settings::CUSTOMIZER__STYLE__SETTINGS_ID__ARRAY['STYLE_SETTING_ID_ICON_SIZE'],
        'setting_args' => [
          'default' => [
            [
              'css_attr' => 'width',
              'value' => ['desktop' => '16px'],
            ]
          ],
          'transport' => 'postMessage',
          'type' => 'option',
          'capability' => 'manage_options',
          // 'sanitize_callback' => [$this, 'gf_social_icons_custom_sanitize'],
          // 'validate_callback' => [$this, 'gf_social_icons_custom_url_validation'],
        ],
        'control_args' => [
          'label' => __('Icon Size', TEXT_DOMAIN),
          'section' => Settings::SECTION_STYLE_SETTINGS,
          'input_attrs' => array(
            'responsive' => true,
            'css_selector' => "#gf_social_icons__wrapper a.gf_social_icons_social_icon svg",
            'heading' => 'Advance Settings',
            'control_for' => Settings::GENERAL_TAB_ELEMENT
          ),
        ],
        'custom_control' => "\GF_SOCIAL_ICONS\Controls\UnitInput"
      ],
      [
        'id' => Settings::CUSTOMIZER__STYLE__SETTINGS_ID__ARRAY['STYLE_SETTING_ID_ICON_HOVER_SIZE'],
        'setting_args' => [
          'default' => [
            [
              'css_attr' => 'width',
              'value' => ['desktop' => ''],
            ]
          ],
          'transport' => 'postMessage',
          'type' => 'option',
          'capability' => 'manage_options',
          // 'sanitize_callback' => [$this, 'gf_social_icons_custom_sanitize'],
          // 'validate_callback' => [$this, 'gf_social_icons_custom_url_validation'],
        ],
        'control_args' => [
          'label' => __('Icon Size', TEXT_DOMAIN),
          'section' => Settings::SECTION_STYLE_SETTINGS,
          'input_attrs' => array(
            'responsive' => true,
            'css_selector' => "#gf_social_icons__wrapper a.gf_social_icons_social_icon:hover svg",
            'heading' => 'Advance Settings',
            'control_for' => Settings::HOVER_TAB_ELEMENT
          ),
        ],
        'custom_control' => "\GF_SOCIAL_ICONS\Controls\UnitInput"
      ],
      [
        'id' => Settings::CUSTOMIZER__STYLE__SETTINGS_ID__ARRAY['STYLE_SETTING_ID_ICON_WRAPPER_SIZE'],
        'setting_args' => [
          'default' => [
            [
              'css_attr' => 'width',
              'value' => ['desktop' => '44px'],
            ]
          ],
          'transport' => 'postMessage',
          'type' => 'option',
          'capability' => 'manage_options',
          // 'sanitize_callback' => [$this, 'gf_social_icons_custom_sanitize'],
          // 'validate_callback' => [$this, 'gf_social_icons_custom_url_validation'],
        ],
        'control_args' => [
          'label' => __('Icon Wrapper', TEXT_DOMAIN),
          'section' => Settings::SECTION_STYLE_SETTINGS,
          'input_attrs' => array(
            'responsive' => true,
            'css_selector' => "#gf_social_icons__wrapper a.gf_social_icons_social_icon",
            'heading' => 'Advance Settings',
            'control_for' => Settings::GENERAL_TAB_ELEMENT
          ),
        ],
        'custom_control' => "\GF_SOCIAL_ICONS\Controls\UnitInput"
      ],
      [
        'id' => Settings::CUSTOMIZER__STYLE__SETTINGS_ID__ARRAY['STYLE_SETTING_ID_ICON_WRAPPER_HOVER_SIZE'],
        'setting_args' => [
          'default' => [
            [
              'css_attr' => 'width',
              'value' => ['desktop' => ''],
            ]
          ],
          'transport' => 'postMessage',
          'type' => 'option',
          'capability' => 'manage_options',
          // 'sanitize_callback' => [$this, 'gf_social_icons_custom_sanitize'],
          // 'validate_callback' => [$this, 'gf_social_icons_custom_url_validation'],
        ],
        'control_args' => [
          'label' => __('Icon Wrapper size', TEXT_DOMAIN),
          'section' => Settings::SECTION_STYLE_SETTINGS,
          'input_attrs' => array(
            'responsive' => true,
            'css_selector' => "#gf_social_icons__wrapper a.gf_social_icons_social_icon:hover",
            'heading' => 'Advance Settings',
            'control_for' => Settings::HOVER_TAB_ELEMENT
          ),
        ],
        'custom_control' => "\GF_SOCIAL_ICONS\Controls\UnitInput"
      ],
      [
        'id' => Settings::CUSTOMIZER__STYLE__SETTINGS_ID__ARRAY['STYLE_SETTING_ID_SPACING'],
        'setting_args' => [
          'default' => [
            [
              'css_attr' => 'row-gap',
              'value' => ['desktop' => '20px'],
            ]
          ],
          'transport' => 'postMessage',
          'type' => 'option',
          'capability' => 'manage_options',
          // 'sanitize_callback' => [$this, 'gf_social_icons_custom_sanitize'],
          // 'validate_callback' => [$this, 'gf_social_icons_custom_url_validation'],
        ],
        'control_args' => [
          'label' => __('Vertical Gap', TEXT_DOMAIN),
          'section' => Settings::SECTION_STYLE_SETTINGS,
          'input_attrs' => array(
            'responsive' => true,
            'css_selector' => "#gf_social_icons__wrapper .gf_social_icons_social_float",
            'heading' => 'Advance Settings',
            'control_for' => Settings::GENERAL_TAB_ELEMENT
          ),
        ],
        'custom_control' => "\GF_SOCIAL_ICONS\Controls\UnitInput"
      ],
      
    ];



    foreach ($controls as $control) {
      $this->add_control(
        new Control(
          $control['id'],
          $control['setting_args'],
          $control['control_args'],
          $control['custom_control'] ? $control['custom_control'] : null
        )

      );
    }
  }


  /**
   * Control for ADD Partial controller 
   * @return void
   */
  public function add_partials()
  {
    $partials = [
      [
        'id' => Settings::PARTIAL_GENERAL_SETTING_ID_SOCIAL_REPEATER,
        'args' => [
          'selector' => "#gf_social_icons__wrapper",
          'settings' => [
            Settings::GENERAL_SETTING_ID_SOCIAL_REPEATER,
          ],
          'render_callback' => function () {
            return TemplateLoader::load_template();
          },
        ]
      ],

    ];

    foreach ($partials as $partial) {
      $this->add_partial(
        new Partial(
          $partial['id'],
          $partial['args']
        )
      );
    }

  }

}

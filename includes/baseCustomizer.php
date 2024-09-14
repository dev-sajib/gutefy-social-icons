<?php
namespace GF_SOCIAL_ICONS;

use GF_SOCIAL_ICONS\Types\Panel;
use GF_SOCIAL_ICONS\Types\Partial;
use GF_SOCIAL_ICONS\Types\Section;
use GF_SOCIAL_ICONS\Types\Control;

class BaseCustomizer
{

    protected $wpc;

    protected $selective_refresh;

    private $controls_to_register = array();

    private $panel_to_register = array();

    private $section_to_register = array();

    private $partials_to_register = array();

    public function __construct()
    {
        add_action('customize_register', [$this, 'register_control_callback']);
    }

    public function register_control_callback($wp_customize)
    {
        $this->wpc = $wp_customize;
        $this->register_panels();
        $this->register_section();
        $this->register_control();
        $this->register_partials();
    }

    private function register_panels()
    {
        $panels = $this->panel_to_register;

        foreach ($panels as $panel) {
            $this->wpc->add_panel($panel->id, $panel->args);
        }
    }

    protected function add_panel(Panel $panel)
    {
        array_push($this->panel_to_register, $panel);
    }

    protected function add_section(Section $section)
    {
        array_push($this->section_to_register, $section);
    }
    private function register_section()
    {
        $sections = $this->section_to_register;

        foreach ($sections as $section) {
            $this->wpc->add_section($section->id, $section->args);
        }
    }

    private function register_partials()
    {
        $partials = $this->partials_to_register;
        foreach ($partials as $partial) {
            if (empty($partial)) {
                continue;
            }
            $this->wpc->selective_refresh->add_partial($partial->id, $partial->args);
        }
    }



    protected function add_control(Control $control)
    {
        array_push($this->controls_to_register, $control);
    }
	public function add_partial(Partial $partial)
	{
        // var_dump($partial);
		if (empty($partial->args)) {
			return;
		}
		array_push($this->partials_to_register, $partial);
	}
    private function register_control()
    {
        $controls = $this->controls_to_register;
        foreach ($controls as $control) {

            $this->wpc->add_setting($control->id, $control->setting_args);

            $control_type = null;

            if ($control->custom_control !== null) {

                $this->wpc->add_control(new $control->custom_control($this->wpc, $control->id, $control->control_args));
            } else {
                $this->wpc->add_control($control->id, $control->control_args);
            }
        }
    }
}

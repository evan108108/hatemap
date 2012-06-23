<?php
/**
 * BootHero class file.
 * @author Christoffer Niska <ChristofferNiska@gmail.com>
 * @copyright  Copyright &copy; Christoffer Niska 2011-
 * @license http://www.opensource.org/licenses/bsd-license.php New BSD License
 * @package bootstrap.widgets
 * @since 0.9.10
 */

/**
 * Modest bootstrap hero widget.
 * Thanks to Christphe Boulain for suggesting content capturing.
 */
class BootPortlet extends CWidget
{
  /**
   * @var set portlet width
   * fit or number of rows
   */
  public $width = '12';
	/**
	 * @var string the heading text.
	 */
  public $heading = "";

  public $showClose = true;

  public $showToggle = true;

  public $showConfig = true;

  public $onClose = 'return true;';

  public $onToggle = 'return true;';

  public $onConfig = 'return true;';

	/**
	 * @var boolean indicates whether to encode the heading.
	 */
	public $encodeHeading = true;
	/**
	 * @var array the HTML attributes for the widget container.
	 */
	public $htmlOptions = array();

	/**
	 * Initializes the widget.
	 */
	public function init()
  {
    Yii::app()->clientScript->registerCoreScript('jquery');
    Yii::app()->clientScript->registerCssFile(Yii::app()->bootstrap->getAssetsUrl().'/css/portlet.css');
    Yii::app()->clientScript->registerCssFile(Yii::app()->bootstrap->getAssetsUrl().'/css/roundCorners.css');
    Yii::app()->clientScript->registerScriptFile(Yii::app()->bootstrap->getAssetsUrl().'/js/portlet.js');
    /*
		$classes = 'hero-unit';
		if (isset($this->htmlOptions['class']))
			$this->htmlOptions['class'] .= ' '.$classes;
		else
			$this->htmlOptions['class'] = $classes;

		if ($this->encodeHeading)
			$this->heading = CHtml::encode($this->heading);
    */
		ob_start();
    ob_implicit_flush(false);

  }

	/**
	 * Runs the widget.
	 */
	public function run()
  {
    $content = ob_get_clean();
    echo '<div class="span' . $this->width . '">
        	<div class="box">
              <h4 class="box-header round-top">' . $this->heading . '
                  ' . (($this->showClose)? '<a class="box-btn" title="close" onClick="'. $this->onClose . '"><i class="icon-remove"></i></a>': '') . '
                  ' . (($this->showToggle)? '<a class="box-btn" title="toggle" onClick="' . $this->onToggle . '"><i class="icon-minus"></i></a>': '') . '    
                  ' . (($this->showConfig)? '<a class="box-btn" title="config" onClick="' . $this->onConfig . '" data-toggle="modal" href="#box-config-modal"><i class="icon-cog"></i></a>': '') . '
              </h4>         
              <div class="box-container-toggle">
                  <div class="box-content">
                  	' . $content . '               
                  </div>
              </div>
            </div>
        </div><!--/span-->';
    /*
		echo CHtml::openTag('div', $this->htmlOptions);

		if (isset($this->heading))
			echo CHtml::tag('h1', array(), $this->heading);

		echo $content;
    echo '</div>';
     */
	}
}




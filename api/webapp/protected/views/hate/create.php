<?php
$this->breadcrumbs=array(
	'Hates'=>array('index'),
	'Create',
);

$this->menu=array(
	array('label'=>'List Hate','url'=>array('index')),
	array('label'=>'Manage Hate','url'=>array('admin')),
);
?>

<h1>Create Hate</h1>

<?php echo $this->renderPartial('_form', array('model'=>$model)); ?>
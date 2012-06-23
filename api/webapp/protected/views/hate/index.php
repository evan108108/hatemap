<?php
$this->breadcrumbs=array(
	'Hates',
);

$this->menu=array(
	array('label'=>'Create Hate','url'=>array('create')),
	array('label'=>'Manage Hate','url'=>array('admin')),
);
?>

<h1>Hates</h1>

<?php $this->widget('bootstrap.widgets.BootListView',array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>

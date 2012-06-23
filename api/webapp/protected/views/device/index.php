<?php
$this->breadcrumbs=array(
	'Devices',
);

$this->menu=array(
	array('label'=>'Create Device','url'=>array('create')),
	array('label'=>'Manage Device','url'=>array('admin')),
);
?>

<h1>Devices</h1>

<?php $this->widget('bootstrap.widgets.BootListView',array(
	'dataProvider'=>$dataProvider,
	'itemView'=>'_view',
)); ?>

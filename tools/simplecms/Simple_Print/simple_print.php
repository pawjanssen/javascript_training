<?php
// get correct id for plugin
$thisfile = basename(__FILE__, ".php"); // This gets the correct ID for the plugin.

// register plugin
register_plugin(
    $thisfile,    // ID of plugin, should be filename minus php
    'Simple Print',    # Title of plugin
    '1.0',    // Version of plugin
    'OWS_Matthew',    // Author of plugin
    'http://get-simple.info/',    // Author URL
    "'Adds a simple Print option to all the pages in your website.'",    // Plugin Description
    'theme',    // Page type of plugin
    'sp_options'    // Function that displays content
);

// Hooks
add_action('theme-sidebar','createSideMenu',array($thisfile,'Print Settings'));
add_action('index-pretemplate', 'sp_switch',array());
add_action('content-bottom','sp_display',array());




// Generate Settings Page
function sp_options() {
	// Open settings
	if(file_exists(GSDATAOTHERPATH . 'sp_settings.xml')) {
		$data = getXML(GSDATAOTHERPATH . 'sp_settings.xml');
		$sp_active = $data->sp_active;
		$sp_theme = $data->sp_theme;
	} else {
		$sp_active = '';
		$sp_theme = '';
	}
	
	$bad = array(" ", "/");
	$good = array("", "");	 
	if (isset($_POST['submit'])) {
		 // Simple Print Form
		 if($_POST['SP_THEME'] != '') {
			 $SP_THEME_FORM = str_replace($bad, $good, $_POST['SP_THEME']);
			 $SP_ACTIVE_FORM = 'Yes';
		 } else {
			 $SP_THEME_FORM = '';
			 $SP_ACTIVE_FORM = 'No';
		 }
		 
		 if(!file_exists(GSTHEMESPATH . $SP_THEME_FORM . '/template.php')) {
			 echo '<div class="updated">Oops! No theme exists in that folder.</div>';
		 } else {
			 // Save XML file
				$file = GSDATAOTHERPATH . 'sp_settings.xml';
				$xmls = @new SimpleXMLExtended('<item></item>');
				$note = $xmls->addChild('sp_theme', $SP_THEME_FORM);
				$note = $xmls->addChild('sp_active', $SP_ACTIVE_FORM);
				XMLsave($xmls, $file);	
				echo '<div class="updated">Your Changes have been saved!</div>';
			
				$sp_active = 'Yes';
				$sp_theme = $SP_THEME_FORM;		
			 }
	 }
	 
	 // Settings Content
?>
        <h2>Simple Print</h2>
        <p>This plugin displays a print link and automatically changes the theme to a "Print" theme when
        the button is clicked. Below you can specify a theme.</p>
        
        <h2>Settings:</h2>
        
        <form name="sp_settings" method="post" action="<?php echo $_SERVER ['REQUEST_URI']; ?>">
        <p><b>Print Theme Folder:</b>
            <input type="text" name="SP_THEME" class="text" value="<?php if(isset($sp_theme)) { echo $sp_theme; } ?>"/>
            (Ex. "print")</p>
            <input type="submit" name="submit" value="Save" />
        </form>
          <p style="float:right">Developed by: OWS_Matthew</p>
<?php
}


function sp_switch() {
	if(isset($_GET["print"])) {
		global $TEMPLATE;
		if(file_exists(GSDATAOTHERPATH . 'sp_settings.xml')) {
			$data = getXML(GSDATAOTHERPATH . 'sp_settings.xml');
			$sp_theme = $data->sp_theme;
			$TEMPLATE = $sp_theme;
		}
	}
}
function sp_display() {
	// Open Settings
	if(file_exists(GSDATAOTHERPATH . 'sp_settings.xml')) {
		$data = getXML(GSDATAOTHERPATH . 'sp_settings.xml');
		$sp_active_dsp = $data->sp_active;
	} else {
		$sp_active_dsp = '';
	}
	
	// Display Print Link
	if(isset($sp_active_dsp)) {
		echo '<form method="get" name="print" action="'. $_SERVER['REQUEST_URI'] .'">
				<input type="submit" value="print" name="print"/>
				</form>';
	}
}

?>

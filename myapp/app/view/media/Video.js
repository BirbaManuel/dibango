Ext.define('CrimeFinder.view.media.Video', {
	extend: 'Ext.Container',
	xtype: 'crimefindervideo',
	requires: ['Ext.Video', 'Ext.TitleBar'],
	config: {
	layout: 'fit',
	items: [
		{
			xtype : 'titlebar',
			docked : 'top',
			title : 'Accident on GW Parkway'
		},
		{
			xtype: 'video',
			url: 'http://av.vimeo.com/64284/137/87347327.mp4?token=1330978144_f9b698fea38cd408d52a2393240c896c',
            posterUrl: 'http://b.vimeocdn.com/ts/261/062/261062119_640.jpg',
            loop : true
            
        }
            ]
			}
});